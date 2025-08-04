# Tencent Cloud Email Service Setup Guide

This guide will help you set up Tencent Cloud's Email Service (SES) to send emails via API instead of SMTP, which is more reliable and works better with QQ enterprise email.

## Step 1: Create Tencent Cloud Account

1. Go to [Tencent Cloud Console](https://console.cloud.tencent.com/)
2. Sign up with your QQ account or create a new account
3. Complete identity verification (required for email services)

## Step 2: Enable Email Service

1. Go to [Email Service Console](https://console.cloud.tencent.com/ses)
2. Click "Activate Service" 
3. Choose your region (recommend: Hong Kong for international, Beijing for China)

## Step 3: Configure Sending Domain

1. In Email Service console, go to "Email Configuration" → "Sending Domain"
2. Add your domain: `zipcodexpress.com`
3. Complete domain verification:
   - Add TXT record to your DNS
   - Add MX record if needed
   - Wait for verification (may take 24-48 hours)

## Step 4: Create Sending Address

1. Go to "Email Configuration" → "Sending Address"
2. Add sending address: `support@zipcodexpress.com`
3. This should match your existing QQ enterprise email

## Step 5: Get API Credentials

1. Go to [API Key Management](https://console.cloud.tencent.com/cam/capi)
2. Click "Create Key"
3. Note down:
   - **SecretId**: Your access key ID
   - **SecretKey**: Your secret access key (keep this secure!)

## Step 6: Update Environment Variables

Update your `.env` file:

```env
# Tencent Cloud Email Service (Primary)
TENCENT_SECRET_ID=your_secret_id_from_step_5
TENCENT_SECRET_KEY=your_secret_key_from_step_5

# SMTP Fallback (keep existing)
VITE_SMTP_HOST=smtp.exmail.qq.com
VITE_SMTP_PORT=465
VITE_SMTP_USER=support@zipcodexpress.com
VITE_SMTP_PASS=yhsQYoPCwkMd9mLt
```

## Step 7: Test the Service

1. Start the new server:
```bash
node server-tencent.js
```

2. Test Tencent Cloud email:
```bash
curl http://localhost:3001/api/test-tencent
```

3. Test your forms:
   - Registration: `http://localhost:5173/register`
   - Contact: `http://localhost:5173/contact`

## Benefits of Tencent Cloud Email Service

### ✅ Advantages over SMTP
- **Higher reliability**: API-based, not connection-dependent
- **Better deliverability**: Tencent's infrastructure reputation
- **No port blocking**: Works on any hosting (including GoDaddy)
- **Built-in monitoring**: Track delivery status, bounces, etc.
- **Rate limiting**: Handles high volume better than SMTP

### 💰 Cost
- **Free tier**: 1,000 emails/month
- **Paid plans**: Start at ¥0.5 per 1,000 emails
- Much cheaper than other email services

### 🔧 Technical Benefits
- **No SMTP authentication issues**
- **Better error handling and reporting**
- **Automatic retry mechanism**
- **JSON API responses**

## Email Flow Architecture

```
Frontend Form → Backend Server → Tencent Cloud API → Email Delivered
                     ↓ (if Tencent fails)
                SMTP Fallback → QQ Enterprise Email
```

## Troubleshooting

### Domain Verification Issues
- Make sure DNS records are correctly added
- Wait up to 48 hours for propagation
- Check DNS using tools like `nslookup` or online DNS checkers

### API Authentication Errors
- Verify SecretId and SecretKey are correct
- Check that your Tencent Cloud account has email service permissions
- Ensure the sending domain is verified

### Email Not Delivered
- Check Tencent Cloud console for delivery logs
- Verify recipient email address
- Check spam folders
- Ensure sending address matches configured address

## Production Deployment

For production (GoDaddy), you have two options:

### Option 1: Frontend-Only with EmailJS
- Keep EmailJS for simple deployment to GoDaddy
- No backend server needed

### Option 2: Backend with Tencent Cloud
- Deploy backend to Railway/Vercel/Heroku
- Use Tencent Cloud API for professional email delivery
- Better tracking and reliability

## Next Steps

1. Complete domain verification
2. Get API credentials
3. Test both email services
4. Choose deployment strategy
5. Update frontend to use the preferred method

The Tencent Cloud solution is ideal for professional email delivery and works perfectly with your existing QQ enterprise email infrastructure!
