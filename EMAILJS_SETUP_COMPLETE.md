# Complete EmailJS Setup Guide for ZipcodeXpress

This guide helps you set up EmailJS to handle email delivery for both contact and registration forms without needing a backend server.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Note down your **Public Key** from the dashboard

## Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP** (for business emails)
4. Configure your email service:
   - For Gmail: Use your Gmail credentials
   - For business email: Use your SMTP settings
5. Note down your **Service ID**

## Step 3: Create Email Templates

### Contact Form Template
1. Go to **Email Templates** → **Create New Template**
2. Template Name: `Contact Form Submission`
3. Template ID: `contact_form` (or note what you choose)
4. **Subject**: `New Contact Form Submission from {{customer_name}}`
5. **Content**:
```
New contact form submission received:

Name: {{customer_name}}
Email: {{customer_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from the ZipcodeXpress website contact form.
```

### Registration Form Template
1. Create another template: `Registration Form Submission`
2. Template ID: `registration_form` (or note what you choose)
3. **Subject**: `New Registration from {{customer_name}}`
4. **Content**:
```
New registration received:

Customer Information:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}
- City: {{customer_city}}
- Address: {{customer_address}}

Property Details:
- Apartment Units: {{apartment_units}}
- Installation Date: {{installation_date}}

Additional Comments:
{{comments}}

---
This email was sent from the ZipcodeXpress website registration form.
```

## Step 4: Configure Environment Variables

Update your `.env` file with EmailJS credentials:

```env
# EmailJS Configuration (primary email delivery)
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID_CONTACT=contact_form
VITE_EMAILJS_TEMPLATE_ID_REGISTRATION=registration_form
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# SMTP Configuration (fallback)
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your-email@gmail.com
VITE_SMTP_PASS=your-app-password
```

## Step 5: Test Email Delivery

1. Restart your development server: `npm run dev`
2. Open browser console (F12)
3. Test the contact form at `http://localhost:5173/contact`
4. Test the registration form at `http://localhost:5173/register`
5. Check your configured email address for incoming emails

## Step 6: Debugging

If emails aren't working, check the browser console for errors:

```javascript
// In browser console, test EmailJS config:
import { checkEmailJSConfig } from './src/utils/emailDebug.js';
checkEmailJSConfig();
```

## Important Notes

### Free Tier Limits
- EmailJS free tier: 100 emails/month
- For production: Consider upgrading to paid plan

### Email Delivery
- EmailJS sends emails directly from the browser
- No backend server required
- Perfect for static hosting (GoDaddy, GitHub Pages, etc.)

### Security
- Public Key is safe to expose in frontend code
- Template IDs are not sensitive
- Service ID is not sensitive

### Fallback System
The site now uses EmailJS as the primary method with SMTP backend as fallback:
1. First tries EmailJS (works on GoDaddy)
2. If EmailJS fails, tries SMTP backend (works in development)

## Troubleshooting

### Common Issues
1. **"User ID required"**: Make sure `VITE_EMAILJS_PUBLIC_KEY` is set
2. **"Service not found"**: Check `VITE_EMAILJS_SERVICE_ID`
3. **"Template not found"**: Verify template IDs match your EmailJS dashboard
4. **Emails not received**: Check spam folder, verify email service configuration

### Testing Commands
```bash
# Check if EmailJS variables are loaded
npm run dev
# Open browser console and run:
console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);
```

## Deployment to GoDaddy

Once EmailJS is configured:
1. Build the project: `npm run build`
2. Upload the `dist` folder to GoDaddy
3. Emails will work without any backend server!

The EmailJS integration allows the site to send emails directly from the browser, making it perfect for GoDaddy's static hosting environment.

## Quick Setup Checklist

- [ ] Create EmailJS account
- [ ] Set up email service
- [ ] Create contact form template (`contact_form`)
- [ ] Create registration form template (`registration_form`)
- [ ] Update `.env` with all 4 EmailJS variables
- [ ] Test contact form
- [ ] Test registration form
- [ ] Ready for GoDaddy deployment!
