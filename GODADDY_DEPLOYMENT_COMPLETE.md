# Complete GoDaddy Deployment Guide for ZipcodeXpress

This guide shows you how to deploy your React website to GoDaddy with EmailJS for email functionality (no backend server required).

## 🎯 Overview

Since GoDaddy shared hosting **does not support Node.js backends**, we use:
- **Frontend**: React app (built with Vite)
- **Email**: EmailJS (sends emails directly from the browser)
- **No backend server needed!**

## 📧 Step 1: Set Up EmailJS

### 1.1 Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month)
3. Log in to the EmailJS dashboard

### 1.2 Create Email Service
1. Go to **Email Services** → **Add New Service**
2. Choose **Custom SMTP** (to use your QQ enterprise email)
3. Configure with your QQ enterprise email settings:
   ```
   SMTP Server: smtp.exmail.qq.com
   Port: 465
   Username: support@zipcodexpress.com
   Password: yhsQYoPCwkMd9mLt
   ```
4. Test the connection and save
5. **Note down your Service ID** (e.g., `service_abc123`)

### 1.3 Create Email Templates

#### Contact Form Template
1. Go to **Email Templates** → **Create New Template**
2. Template Name: `Contact Form Submission`
3. Template ID: `contact_form`
4. **Subject**: `New Contact: {{subject}}`
5. **Content**:
```html
<h2>New Contact Form Submission</h2>

<h3>Contact Information:</h3>
<ul>
  <li><strong>Name:</strong> {{customer_name}}</li>
  <li><strong>Email:</strong> {{customer_email}}</li>
  <li><strong>Subject:</strong> {{subject}}</li>
</ul>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p><em>This email was sent from the ZipcodeXpress website contact form.</em></p>
```

#### Registration Form Template
1. Create another template: `Registration Form Submission`
2. Template ID: `registration_form`
3. **Subject**: `New Registration: {{customer_name}}`
4. **Content**:
```html
<h2>New Registration from ZipcodeXpress Website</h2>

<h3>Customer Information:</h3>
<ul>
  <li><strong>Name:</strong> {{customer_name}}</li>
  <li><strong>Email:</strong> {{customer_email}}</li>
  <li><strong>Phone:</strong> {{customer_phone}}</li>
  <li><strong>City:</strong> {{customer_city}}</li>
  <li><strong>Address:</strong> {{customer_address}}</li>
</ul>

<h3>Property Details:</h3>
<ul>
  <li><strong>Apartment Units:</strong> {{apartment_units}}</li>
  <li><strong>Installation Date:</strong> {{installation_date}}</li>
</ul>

<h3>Additional Comments:</h3>
<p>{{comments}}</p>

<hr>
<p><em>This email was sent from the ZipcodeXpress website registration form.</em></p>
```

### 1.4 Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `MbqWCc76RvHfnzwvX`)

## ⚙️ Step 2: Configure Your Project

### 2.1 Update .env File
Replace your current `.env` with:

```env
# EmailJS Configuration (for GoDaddy deployment)
VITE_EMAILJS_SERVICE_ID=your_service_id_from_emailjs
VITE_EMAILJS_TEMPLATE_ID_CONTACT=contact_form
VITE_EMAILJS_TEMPLATE_ID_REGISTRATION=registration_form
VITE_EMAILJS_PUBLIC_KEY=your_public_key_from_emailjs
```

### 2.2 Test Locally
1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test both forms:
   - Contact: `http://localhost:5173/contact`
   - Registration: `http://localhost:5173/register`

3. Check browser console for any errors
4. Verify emails are received at `support@zipcodexpress.com`

## 🚀 Step 3: Build and Deploy to GoDaddy

### 3.1 Build the Project
```bash
cd c:\Development\website
npm run build
```

This creates a `dist` folder with your compiled website.

### 3.2 Upload to GoDaddy
1. **Log in to GoDaddy** hosting control panel
2. **Go to File Manager** (or use FTP client like FileZilla)
3. **Navigate to your domain's root directory** (usually `public_html` or `www`)
4. **Delete any existing files** in the directory
5. **Upload ALL contents** of the `dist` folder to the root directory
   - **Important**: Upload the contents OF the dist folder, not the dist folder itself
   - Your files should be directly in `public_html`, not in `public_html/dist`

### 3.3 Verify Deployment
1. Visit your website: `https://yourdomain.com`
2. Test the contact form: `https://yourdomain.com/contact`
3. Test the registration form: `https://yourdomain.com/register`
4. Check that emails are being sent and received

## 🔧 Step 4: Troubleshooting

### Common Issues

#### 1. "Page Not Found" on Routes
**Problem**: Direct links like `/contact` show 404
**Solution**: Add this to your GoDaddy root directory as `.htaccess`:
```apache
RewriteEngine On
RewriteRule ^(?!.*\\.).*$ /index.html [L]
```

#### 2. EmailJS Not Working
**Problem**: Forms submit but no emails received
**Solutions**:
- Check browser console for errors
- Verify all EmailJS credentials in `.env`
- Test EmailJS service in their dashboard
- Check spam folder for emails

#### 3. Images Not Loading
**Problem**: Images show broken links
**Solution**: 
- Ensure all images are in `public` folder, not `src/assets`
- Use relative paths: `/images/logo.png` not `./images/logo.png`

#### 4. Environment Variables Not Working
**Problem**: EmailJS credentials showing as undefined
**Solution**:
- All variables must start with `VITE_`
- Rebuild after changing `.env`: `npm run build`
- Upload new `dist` folder to GoDaddy

### Testing Checklist
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Contact form sends emails
- [ ] Registration form sends emails
- [ ] Images and assets load properly
- [ ] Mobile responsiveness works
- [ ] All pages accessible via direct URLs

## 💡 Additional Tips

### Performance Optimization
- Enable GoDaddy's CDN if available
- Compress images before uploading
- Consider using WebP format for images

### Email Reliability
- EmailJS free tier: 100 emails/month
- For higher volume, upgrade to EmailJS paid plan
- Monitor email delivery in EmailJS dashboard

### Backup Strategy
- Keep your `dist` folder backed up
- Save your `.env` configuration securely
- Document your EmailJS template IDs

## 🎉 You're Done!

Your ZipcodeXpress website is now live on GoDaddy with:
- ✅ Full React functionality
- ✅ Working contact and registration forms
- ✅ Email delivery via EmailJS
- ✅ No backend server required
- ✅ Professional email integration with your QQ enterprise email

Your website will send all form submissions to `support@zipcodexpress.com` using your existing QQ enterprise email infrastructure!
