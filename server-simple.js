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
    smtpTransporter = nodemailer.createTransporter({
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

const app = express();
const PORT = process.env.PORT || 3001;

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
    const transporter = nodemailer.createTransport({
      host: process.env.VITE_SMTP_HOST,
      port: parseInt(process.env.VITE_SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.VITE_SMTP_USER,
        pass: process.env.VITE_SMTP_PASS,
      },
    });

    await transporter.verify();
    res.json({ success: true, message: 'SMTP connection works!' });
  } catch (error) {
    console.error('SMTP test failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send contact form email
app.post('/api/send-contact-email', async (req, res) => {
  console.log('Contact form email requested:', req.body);
  console.log('🔍 Debugging contact form data:');
  console.log('  name:', req.body.name);
  console.log('  email:', req.body.email);
  console.log('  company:', req.body.company);
  console.log('  phone:', req.body.phone);
  console.log('  message:', req.body.message);
  
  try {
    const {
      name,
      email,
      company,
      phone,
      message
    } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.VITE_SMTP_HOST,
      port: parseInt(process.env.VITE_SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.VITE_SMTP_USER,
        pass: process.env.VITE_SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.VITE_SMTP_USER}>`,
      to: 'support@zipcodexpress.com',
      replyTo: email,
      subject: 'New Contact Form Message',
      html: `
        <h2>New Contact Form Message</h2>
        
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Company:</strong> ${company || 'Not provided'}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
        </ul>

        <h3>Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>

        <hr>
        <p><em>Please respond to this inquiry at your earliest convenience.</em></p>
      `,
      text: `
New Contact Form Message

Contact Details:
- Name: ${name}
- Email: ${email}
- Company: ${company || 'Not provided'}
- Phone: ${phone || 'Not provided'}

Message:
${message}

Please respond to this inquiry at your earliest convenience.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent successfully:', info.messageId);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Contact email send failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send email
app.post('/api/send-email', async (req, res) => {
  console.log('Email send requested:', req.body);
  console.log('🔍 Debugging received data:');
  console.log('  customerName:', req.body.customerName);
  console.log('  customerPhone:', req.body.customerPhone);
  console.log('  customerEmail:', req.body.customerEmail);
  console.log('  customerCity:', req.body.customerCity);
  console.log('  customerAddress:', req.body.customerAddress);
  console.log('  apartmentUnits:', req.body.apartmentUnits);
  console.log('  installationDate:', req.body.installationDate);
  console.log('  comments:', req.body.comments);
  
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

    const transporter = nodemailer.createTransport({
      host: process.env.VITE_SMTP_HOST,
      port: parseInt(process.env.VITE_SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.VITE_SMTP_USER,
        pass: process.env.VITE_SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${customerName}" <${process.env.VITE_SMTP_USER}>`,
      to: 'richardz@zipcodexpress.com',
      replyTo: customerEmail,
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
          <li><strong>Preferred Installation Date:</strong> ${installationDate || 'Not specified'}</li>
        </ul>

        <h3>Additional Comments:</h3>
        <p>${comments || 'No additional comments'}</p>

        <hr>
        <p><em>Please contact this customer to discuss their locker requirements.</em></p>
      `,
      text: `
New Locker Registration Request

Customer Details:
- Name: ${customerName}
- Phone: ${customerPhone}
- Email: ${customerEmail}
- City: ${customerCity}
- Address: ${customerAddress}

Property Information:
- Number of Apartment Units: ${apartmentUnits}
- Preferred Installation Date: ${installationDate || 'Not specified'}

Additional Comments:
${comments || 'No additional comments'}

Please contact this customer to discuss their locker requirements.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('GET  /', 'GET  /api/health', 'GET  /api/test-smtp', 'POST /api/send-email', 'POST /api/send-contact-email');
});
