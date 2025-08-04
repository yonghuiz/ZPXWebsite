import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import TencentEmailService from './services/TencentEmailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize email services
const tencentEmailService = new TencentEmailService();
let smtpTransporter = null;

// Initialize SMTP transporter as fallback
const initSMTPTransporter = () => {
  try {
    smtpTransporter = nodemailer.createTransport({
      host: process.env.VITE_SMTP_HOST,
      port: parseInt(process.env.VITE_SMTP_PORT),
      secure: process.env.VITE_SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.VITE_SMTP_USER,
        pass: process.env.VITE_SMTP_PASS,
      },
    });
    console.log('✅ SMTP transporter initialized');
  } catch (error) {
    console.error('❌ Failed to initialize SMTP transporter:', error);
  }
};

initSMTPTransporter();

app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Email server is running!' });
});

// Health check
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// SMTP Test
app.get('/api/test-smtp', async (req, res) => {
  console.log('SMTP test requested');
  try {
    if (!smtpTransporter) {
      throw new Error('SMTP transporter not initialized');
    }
    await smtpTransporter.verify();
    res.json({ success: true, message: 'SMTP connection works!' });
  } catch (error) {
    console.error('SMTP test failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test Tencent Cloud Email
app.get('/api/test-tencent', async (req, res) => {
  console.log('Tencent Cloud email test requested');
  try {
    const result = await tencentEmailService.sendEmail({
      fromEmail: 'support@zipcodexpress.com',
      toEmails: ['support@zipcodexpress.com'],
      subject: 'Test Email from Tencent Cloud',
      htmlContent: '<h1>Test Email</h1><p>This is a test email sent via Tencent Cloud SES API.</p>'
    });
    res.json({ success: true, result });
  } catch (error) {
    console.error('Tencent Cloud test failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send contact form email
app.post('/api/send-contact-email', async (req, res) => {
  console.log('Contact form email requested:', req.body);
  
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields: name, email, subject, message' 
    });
  }

  try {
    // Try Tencent Cloud first
    try {
      console.log('🚀 Attempting to send via Tencent Cloud...');
      const result = await tencentEmailService.sendContactEmail({ name, email, subject, message });
      console.log('✅ Contact email sent successfully via Tencent Cloud:', result);
      return res.json({
        success: true,
        message: 'Contact email sent successfully via Tencent Cloud!',
        service: 'tencent-cloud'
      });
    } catch (tencentError) {
      console.warn('⚠️ Tencent Cloud failed, trying SMTP fallback...', tencentError.message);
      
      // Fallback to SMTP
      if (!smtpTransporter) {
        throw new Error('Both Tencent Cloud and SMTP are unavailable');
      }

      const htmlContent = `
        <h2>New Contact Form Submission</h2>
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Subject:</strong> ${subject}</li>
        </ul>
        
        <h3>Message:</h3>
        <p>${message}</p>
        
        <hr>
        <p><em>This email was sent from the ZipcodeXpress website contact form.</em></p>
      `;

      await smtpTransporter.sendMail({
        from: process.env.VITE_SMTP_USER,
        to: 'support@zipcodexpress.com',
        subject: `Contact: ${subject}`,
        html: htmlContent,
      });

      console.log('✅ Contact email sent successfully via SMTP fallback');
      return res.json({
        success: true,
        message: 'Contact email sent successfully via SMTP!',
        service: 'smtp-fallback'
      });
    }
  } catch (error) {
    console.error('❌ All email services failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error.message
    });
  }
});

// Send registration email
app.post('/api/send-email', async (req, res) => {
  console.log('Registration email requested:', req.body);
  
  const {
    customerName,
    customerPhone,
    customerEmail,
    customerCity,
    customerAddress,
    apartmentUnits,
    installationDate,
    comments
  } = req.body;

  if (!customerName || !customerEmail || !customerPhone) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields: customerName, customerEmail, customerPhone' 
    });
  }

  try {
    // Try Tencent Cloud first
    try {
      console.log('🚀 Attempting to send via Tencent Cloud...');
      const result = await tencentEmailService.sendRegistrationEmail(req.body);
      console.log('✅ Registration email sent successfully via Tencent Cloud:', result);
      return res.json({
        success: true,
        message: 'Registration email sent successfully via Tencent Cloud!',
        service: 'tencent-cloud'
      });
    } catch (tencentError) {
      console.warn('⚠️ Tencent Cloud failed, trying SMTP fallback...', tencentError.message);
      
      // Fallback to SMTP
      if (!smtpTransporter) {
        throw new Error('Both Tencent Cloud and SMTP are unavailable');
      }

      const htmlContent = `
        <h2>New Registration from ZipcodeXpress Website</h2>
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${customerName}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
          <li><strong>Phone:</strong> ${customerPhone}</li>
          <li><strong>City:</strong> ${customerCity}</li>
          <li><strong>Address:</strong> ${customerAddress}</li>
        </ul>
        
        <h3>Property Details:</h3>
        <ul>
          <li><strong>Apartment Units:</strong> ${apartmentUnits}</li>
          <li><strong>Installation Date:</strong> ${installationDate}</li>
        </ul>
        
        <h3>Additional Comments:</h3>
        <p>${comments || 'No additional comments'}</p>
        
        <hr>
        <p><em>This email was sent from the ZipcodeXpress website registration form.</em></p>
      `;

      await smtpTransporter.sendMail({
        from: process.env.VITE_SMTP_USER,
        to: 'support@zipcodexpress.com',
        subject: `New Registration from ${customerName}`,
        html: htmlContent,
      });

      console.log('✅ Registration email sent successfully via SMTP fallback');
      return res.json({
        success: true,
        message: 'Registration email sent successfully via SMTP!',
        service: 'smtp-fallback'
      });
    }
  } catch (error) {
    console.error('❌ All email services failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('GET  /');
  console.log('GET  /api/health');
  console.log('GET  /api/test-smtp');
  console.log('GET  /api/test-tencent');
  console.log('POST /api/send-email');
  console.log('POST /api/send-contact-email');
  
  // Log configuration status
  console.log('\n📧 Email Service Configuration:');
  console.log('Tencent Cloud SES:', process.env.TENCENT_SECRET_ID ? '✅ Configured' : '❌ Missing credentials');
  console.log('SMTP Fallback:', process.env.VITE_SMTP_HOST ? '✅ Configured' : '❌ Missing credentials');
});
