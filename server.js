import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Create transporter using SMTP settings from .env
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.VITE_SMTP_HOST,
    port: parseInt(process.env.VITE_SMTP_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.VITE_SMTP_USER,
      pass: process.env.VITE_SMTP_PASS,
    },
  });
};

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    console.log('📧 Received email request:', req.body);
    
    const {
      customerName,
      customerPhone,
      customerEmail,
      customerCity,
      customerState,
      customerAddress,
      apartmentUnits,
      installationDate,
      comments
    } = req.body;

    // Create transporter
    console.log('🔧 Creating SMTP transporter...');
    const transporter = createTransporter();

    // Test the connection first
    console.log('🧪 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    // Email content
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
          <li><strong>State:</strong> ${customerState || 'Not specified'}</li>
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
- State: ${customerState || 'Not specified'}
- Address: ${customerAddress}

Property Information:
- Number of Apartment Units: ${apartmentUnits}
- Preferred Installation Date: ${installationDate || 'Not specified'}

Additional Comments:
${comments || 'No additional comments'}

Please contact this customer to discuss their locker requirements.
      `
    };

    // Send email
    console.log('📤 Sending email...');
    console.log('📧 Mail options:', { 
      from: mailOptions.from, 
      to: mailOptions.to, 
      subject: mailOptions.subject 
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);

    res.json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    console.error('❌ Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message,
      details: {
        code: error.code,
        command: error.command,
        response: error.response
      }
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Test SMTP connection endpoint
app.get('/api/test-smtp', async (req, res) => {
  try {
    console.log('🧪 Testing SMTP connection...');
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ SMTP connection test successful');
    res.json({ 
      success: true, 
      message: 'SMTP connection is working',
      config: {
        host: process.env.VITE_SMTP_HOST,
        port: process.env.VITE_SMTP_PORT,
        user: process.env.VITE_SMTP_USER
      }
    });
  } catch (error) {
    console.error('❌ SMTP connection test failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'SMTP connection failed',
      error: error.message,
      details: {
        code: error.code,
        command: error.command,
        response: error.response
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Email server running on http://localhost:${PORT}`);
  console.log('📧 SMTP Configuration:');
  console.log(`   Host: ${process.env.VITE_SMTP_HOST}`);
  console.log(`   Port: ${process.env.VITE_SMTP_PORT}`);
  console.log(`   User: ${process.env.VITE_SMTP_USER}`);
  console.log(`   Target: richardz@zipcodexpress.com`);
  console.log('📍 API endpoints available:');
  console.log('   GET  /api/health');
  console.log('   GET  /api/test-smtp');
  console.log('   POST /api/send-email');
});
