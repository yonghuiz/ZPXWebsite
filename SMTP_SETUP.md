# SMTP Email Service Setup Guide

## Overview
This setup replaces Formspree with a local SMTP server that uses QQ Enterprise Email (smtp.exmail.qq.com) to send emails.

## Files Created
1. **server-smtp.js** - Backend Node.js server that handles SMTP email sending
2. **src/utils/emailService-smtp.js** - Frontend utility that connects to the SMTP server
3. **package-smtp.json** - Dependencies for the SMTP server
4. **.env** - Updated with SMTP configuration

## Setup Instructions

### 1. Install Dependencies for SMTP Server
```bash
# Install backend dependencies
npm install --prefix . express nodemailer cors dotenv
```

Or using the package-smtp.json:
```bash
npm install --prefix . --package-lock-only
```

### 2. Verify Environment Variables
Make sure your `.env` file has these settings:
```env
VITE_SMTP_HOST=smtp.exmail.qq.com
VITE_SMTP_PORT=465
VITE_SMTP_USER=support@zipcodexpress.com
VITE_SMTP_PASS=your_password_here
VITE_SMTP_SERVER_URL=http://localhost:3001
```

### 3. Start the SMTP Server
```bash
# In a separate terminal window, start the SMTP server
node server-smtp.js
```

The server will start on port 3001 and should display:
```
✅ SMTP Email Server is running on port 3001
📧 SMTP Host: smtp.exmail.qq.com
📧 SMTP User: support@zipcodexpress.com
🔗 Test endpoint: http://localhost:3001/api/email/test
```

### 4. Test the SMTP Configuration
Open your browser and visit:
```
http://localhost:3001/api/email/test
```

You should see a success message if the SMTP configuration is correct.

### 5. Start Your React App
```bash
# In your main terminal
npm run dev
```

## API Endpoints

### Test Endpoint
- **GET** `/api/email/test`
- Tests SMTP configuration
- Returns success status and configuration details

### Contact Email
- **POST** `/api/email/contact`
- Sends contact form emails
- Required fields: `name`, `email`, `message`
- Optional fields: `company`, `phone`

### Registration/Quote Email
- **POST** `/api/email/registration`
- Sends quote request emails
- Required fields: `name`, `phone`, `email`, `address`, `apartmentUnits`
- Optional fields: `city`, `installationDate`, `comments`

## How It Works

1. **Frontend** (React) → Submits form data
2. **emailService.js** → Calls `emailService-smtp.js`
3. **emailService-smtp.js** → Sends data to backend server (localhost:3001)
4. **server-smtp.js** → Uses nodemailer to send email via smtp.exmail.qq.com
5. **QQ SMTP Server** → Delivers email to support@zipcodexpress.com

## Production Deployment

### For Deployment with Backend Support (e.g., Netlify, Vercel, Railway):
1. Deploy the SMTP server separately or as a serverless function
2. Update `VITE_SMTP_SERVER_URL` in .env to point to your deployed server URL
3. Ensure environment variables are set in your hosting platform

### For GoDaddy (No Backend Support):
- This SMTP solution **requires a backend server** to run
- For GoDaddy hosting, continue using EmailJS or Formspree
- To use SMTP on GoDaddy, you would need:
  - A separate server (VPS, cloud instance) to run the SMTP server
  - Or use a serverless platform like AWS Lambda with API Gateway

## Troubleshooting

### SMTP Server Not Starting
- Check if port 3001 is already in use
- Verify all dependencies are installed: `npm install express nodemailer cors dotenv`
- Check if .env file exists and has correct values

### Email Not Sending
1. Test SMTP configuration: `http://localhost:3001/api/email/test`
2. Check SMTP credentials in .env file
3. Verify QQ email SMTP settings:
   - Host: smtp.exmail.qq.com
   - Port: 465 (SSL) or 587 (TLS)
   - Authentication enabled

### Frontend Cannot Connect
- Ensure SMTP server is running
- Check `VITE_SMTP_SERVER_URL` in .env
- Verify CORS is enabled in server-smtp.js
- Check browser console for connection errors

## Switching Back to Formspree

If you need to switch back to Formspree:
1. Import from `emailService-formspree.js` instead in `emailService.js`
2. Or restore the old emailService.js from backup
3. Stop the SMTP server

## Security Notes

⚠️ **Important Security Considerations:**
- Never commit .env file with real passwords to Git
- Use environment variables in production
- Keep SMTP credentials secure
- Consider using OAuth2 for Gmail or other providers
- Implement rate limiting on the SMTP server to prevent abuse
- Add authentication/API keys for production use

## Support

For issues or questions:
- Email: support@zipcodexpress.com
- Check server logs for error messages
- Verify QQ email service is active and credentials are correct
