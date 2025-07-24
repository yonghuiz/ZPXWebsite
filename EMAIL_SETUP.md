# Email Configuration Guide

This guide explains how to configure email sending for the registration form.

## Option 1: EmailJS (Recommended for Frontend-only Solutions)

EmailJS is a service that allows sending emails directly from the frontend without exposing SMTP credentials.

### Setup Steps:

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template content:

```html
Subject: {{subject}}

New Locker Registration Request

Customer Details:
- Name: {{customer_name}}
- Phone: {{customer_phone}}
- Email: {{customer_email}}
- City: {{customer_city}}
- Address: {{customer_address}}

Property Information:
- Number of Apartment Units: {{apartment_units}}
- Preferred Installation Date: {{installation_date}}

Additional Comments:
{{comments}}

Please contact this customer to discuss their locker requirements.

---
This email was sent from the ZipcodeXpress website registration form.
```

4. **Get Configuration Values**
   - Service ID: Found in your "Email Services" section
   - Template ID: Found in your "Email Templates" section
   - Public Key: Found in "Account" > "General" > "Public Key"

5. **Update Environment Variables**
   - Edit the `.env` file in your project root:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Option 2: Custom SMTP Server

If you prefer to use your own SMTP server, you'll need to create a backend API endpoint.

### Backend Setup (Node.js Example):

1. **Install Dependencies**
```bash
npm install nodemailer express cors
```

2. **Create API Endpoint** (`server.js`):
```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// SMTP configuration
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-server.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@domain.com',
    pass: 'your-password'
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
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

    const mailOptions = {
      from: 'noreply@zipcodexpress.com',
      to: 'support@zipcodexpress.com',
      subject: 'New Locker Registration Request',
      html: `
        <h2>New Locker Registration Request</h2>
        
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${customerName}</li>
          <li><strong>Phone:</strong> ${customerPhone}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
          <li><strong>City:</strong> ${customerCity}</li>
          <li><strong>Address:</strong> ${customerAddress}</li>
        </ul>
        
        <h3>Property Information:</h3>
        <ul>
          <li><strong>Number of Apartment Units:</strong> ${apartmentUnits}</li>
          <li><strong>Preferred Installation Date:</strong> ${installationDate}</li>
        </ul>
        
        <h3>Additional Comments:</h3>
        <p>${comments}</p>
        
        <hr>
        <p><em>This email was sent from the ZipcodeXpress website registration form.</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Email server running on port 3001');
});
```

3. **Update Frontend Configuration**
   - The frontend will automatically fallback to the custom SMTP endpoint if EmailJS fails
   - Make sure your backend server is running on the expected port

## SMTP Server Information Needed

To configure your SMTP server, provide the following information:

- **SMTP Host**: (e.g., smtp.gmail.com, smtp.office365.com)
- **SMTP Port**: (usually 587 for TLS, 465 for SSL, 25 for non-encrypted)
- **Authentication**: Username and password
- **Security**: TLS/SSL settings
- **From Email**: The email address that will appear as the sender

## Testing

After configuration, test the form by:

1. Filling out the registration form
2. Submitting it
3. Checking if the email arrives at support@zipcodexpress.com
4. Verifying all form data is included in the email

## Troubleshooting

### Common Issues:

1. **EmailJS Configuration Errors**
   - Verify all environment variables are correct
   - Check that the template variables match exactly
   - Ensure the email service is properly configured

2. **SMTP Authentication Errors**
   - Verify username/password are correct
   - Check if 2FA requires an app-specific password
   - Ensure the SMTP server allows the connection

3. **CORS Issues**
   - Make sure your backend has proper CORS configuration
   - Verify the frontend is making requests to the correct URL

4. **Rate Limiting**
   - EmailJS has usage limits on free plans
   - SMTP servers may have rate limits

## Security Notes

- Never expose SMTP credentials in frontend code
- Use environment variables for all sensitive configuration
- Consider implementing rate limiting to prevent spam
- Validate and sanitize all form inputs
- Use HTTPS in production

## Support

If you need help configuring your specific SMTP server, please provide:
- SMTP server details
- Preferred authentication method
- Any specific requirements or restrictions
