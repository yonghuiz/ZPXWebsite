# EmailJS Setup Guide for GoDaddy Deployment

## Step 1: EmailJS Account Setup

1. Go to [emailjs.com](https://www.emailjs.com/) and create a free account
2. Create a new service:
   - Choose Gmail (or your preferred email provider)
   - Connect your support@zipcodexpress.com account
3. Create email templates
4. Get your credentials

## Step 2: Required EmailJS Credentials

You'll need these from your EmailJS dashboard:
- **Service ID** (e.g., `service_abc123`)
- **Template ID** (e.g., `template_def456`) 
- **Public Key** (e.g., `user_ghi789`)

## Step 3: Environment Variables

Add to your `.env` file:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id  
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Step 4: Email Templates

### Contact Form Template:
```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Company: {{company}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from the ZipcodeXpress website contact form.
```

### Registration Form Template:
```
Subject: New Locker Registration Request from {{customer_name}}

Customer Details:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}
- City: {{customer_city}}
- Address: {{customer_address}}

Property Information:
- Apartment Units: {{apartment_units}}
- Installation Date: {{installation_date}}

Comments: {{comments}}

---
Please contact this customer to discuss their locker requirements.
```

## Step 5: Template Parameters

Make sure your EmailJS templates use these parameter names:

### Contact Form:
- `from_name` → customer name
- `from_email` → customer email  
- `company` → company name
- `phone` → phone number
- `message` → message content
- `to_email` → support@zipcodexpress.com (fixed)

### Registration Form:
- `customer_name` → name
- `customer_email` → email
- `customer_phone` → phone
- `customer_city` → city
- `customer_address` → address
- `apartment_units` → units
- `installation_date` → date
- `comments` → comments
- `to_email` → support@zipcodexpress.com (fixed)

## Step 6: Benefits

- ✅ No backend server required
- ✅ Works perfectly with GoDaddy shared hosting
- ✅ Free tier: 200 emails/month
- ✅ Reliable delivery
- ✅ Easy to deploy and maintain
