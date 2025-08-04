// Tencent Cloud Email Service
import crypto from 'crypto';

class TencentEmailService {
  constructor() {
    this.secretId = process.env.TENCENT_SECRET_ID;
    this.secretKey = process.env.TENCENT_SECRET_KEY;
    this.region = 'ap-hongkong'; // Can be changed to ap-beijing, ap-shanghai, etc.
    this.endpoint = 'ses.tencentcloudapi.com';
    this.service = 'ses';
    this.version = '2020-10-02';
  }

  // Generate signature for Tencent Cloud API
  sign(method, uri, query, headers, payload, timestamp) {
    const date = new Date(timestamp * 1000).toISOString().split('T')[0];
    
    // Step 1: Create canonical request
    const canonicalQueryString = Object.keys(query)
      .sort()
      .map(key => `${key}=${encodeURIComponent(query[key])}`)
      .join('&');
    
    const canonicalHeaders = Object.keys(headers)
      .sort()
      .map(key => `${key.toLowerCase()}:${headers[key]}`)
      .join('\n') + '\n';
    
    const signedHeaders = Object.keys(headers)
      .sort()
      .map(key => key.toLowerCase())
      .join(';');
    
    const hashedPayload = crypto.createHash('sha256').update(payload, 'utf8').digest('hex');
    
    const canonicalRequest = [
      method,
      uri,
      canonicalQueryString,
      canonicalHeaders,
      signedHeaders,
      hashedPayload
    ].join('\n');
    
    // Step 2: Create string to sign
    const algorithm = 'TC3-HMAC-SHA256';
    const credentialScope = `${date}/${this.service}/tc3_request`;
    const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex');
    
    const stringToSign = [
      algorithm,
      timestamp,
      credentialScope,
      hashedCanonicalRequest
    ].join('\n');
    
    // Step 3: Calculate signature
    const secretDate = crypto.createHmac('sha256', `TC3${this.secretKey}`).update(date, 'utf8').digest();
    const secretService = crypto.createHmac('sha256', secretDate).update(this.service, 'utf8').digest();
    const secretSigning = crypto.createHmac('sha256', secretService).update('tc3_request', 'utf8').digest();
    const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign, 'utf8').digest('hex');
    
    // Step 4: Create authorization header
    const authorization = `${algorithm} Credential=${this.secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
    
    return authorization;
  }

  // Send email using Tencent Cloud SES API
  async sendEmail({ fromEmail, toEmails, subject, htmlContent, textContent }) {
    const timestamp = Math.floor(Date.now() / 1000);
    
    const payload = JSON.stringify({
      FromEmailAddress: fromEmail,
      Destination: toEmails,
      Subject: subject,
      ReplyToAddresses: [fromEmail],
      Template: {
        TemplateData: JSON.stringify({
          subject: subject,
          content: htmlContent || textContent
        })
      },
      Simple: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: htmlContent || textContent,
            Charset: 'UTF-8'
          },
          Text: {
            Data: textContent || htmlContent,
            Charset: 'UTF-8'
          }
        }
      }
    });

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Host': this.endpoint,
      'X-TC-Action': 'SendEmail',
      'X-TC-Version': this.version,
      'X-TC-Region': this.region,
      'X-TC-Timestamp': timestamp.toString()
    };

    const authorization = this.sign('POST', '/', {}, headers, payload, timestamp);
    headers['Authorization'] = authorization;

    try {
      const response = await fetch(`https://${this.endpoint}/`, {
        method: 'POST',
        headers: headers,
        body: payload
      });

      const result = await response.json();
      
      if (response.ok && !result.Response.Error) {
        return {
          success: true,
          messageId: result.Response.MessageId,
          message: 'Email sent successfully via Tencent Cloud SES'
        };
      } else {
        throw new Error(result.Response.Error?.Message || 'Unknown error');
      }
    } catch (error) {
      console.error('Tencent Cloud Email API Error:', error);
      throw new Error(`Failed to send email via Tencent Cloud: ${error.message}`);
    }
  }

  // Send registration email
  async sendRegistrationEmail(formData) {
    const htmlContent = `
      <h2>New Registration from ZipcodeXpress Website</h2>
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.customerName}</li>
        <li><strong>Email:</strong> ${formData.customerEmail}</li>
        <li><strong>Phone:</strong> ${formData.customerPhone}</li>
        <li><strong>City:</strong> ${formData.customerCity}</li>
        <li><strong>Address:</strong> ${formData.customerAddress}</li>
      </ul>
      
      <h3>Property Details:</h3>
      <ul>
        <li><strong>Apartment Units:</strong> ${formData.apartmentUnits}</li>
        <li><strong>Installation Date:</strong> ${formData.installationDate}</li>
      </ul>
      
      <h3>Additional Comments:</h3>
      <p>${formData.comments || 'No additional comments'}</p>
      
      <hr>
      <p><em>This email was sent from the ZipcodeXpress website registration form.</em></p>
    `;

    return await this.sendEmail({
      fromEmail: 'support@zipcodexpress.com',
      toEmails: ['support@zipcodexpress.com'],
      subject: `New Registration from ${formData.customerName}`,
      htmlContent: htmlContent
    });
  }

  // Send contact email
  async sendContactEmail(formData) {
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.name}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Subject:</strong> ${formData.subject}</li>
      </ul>
      
      <h3>Message:</h3>
      <p>${formData.message}</p>
      
      <hr>
      <p><em>This email was sent from the ZipcodeXpress website contact form.</em></p>
    `;

    return await this.sendEmail({
      fromEmail: 'support@zipcodexpress.com',
      toEmails: ['support@zipcodexpress.com'],
      subject: `Contact: ${formData.subject}`,
      htmlContent: htmlContent
    });
  }
}

export default TencentEmailService;
