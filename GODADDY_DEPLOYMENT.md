# GoDaddy Deployment Strategy for React + Email Server

## Your Current Setup
- **Frontend:** React/Vite application (static files)
- **Backend:** Node.js Express server for email functionality
- **Host:** GoDaddy

## Recommended Deployment Strategy

### 1. Frontend to GoDaddy Shared Hosting

#### Step 1: Build for Production
```bash
npm run build
```

#### Step 2: Prepare for Upload
- The `dist` folder contains your website
- Download FileZilla or use GoDaddy File Manager
- Upload contents of `dist` folder to `public_html` directory

#### Step 3: Configure Environment
Create a production environment configuration:

### 2. Backend to Cloud Service (Choose One)

#### Option A: Railway.app (Recommended - Simple & Affordable)
1. Create account at railway.app
2. Connect GitHub repository  
3. Add environment variables:
   - VITE_SMTP_HOST=smtp.gmail.com
   - VITE_SMTP_PORT=465
   - VITE_SMTP_USER=your-email@gmail.com
   - VITE_SMTP_PASS=your-app-password
4. Deploy automatically

#### Option B: Vercel (Free Tier)
1. Create account at vercel.com
2. Import your GitHub repository
3. Configure as API functions
4. Add environment variables

#### Option C: Render (Alternative)
1. Create account at render.com
2. Connect repository
3. Set up as web service
4. Add environment variables

## Implementation Steps

### 1. Create Production Configuration

Create `src/config/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.railway.app'
  : 'http://localhost:3001';

export { API_BASE_URL };
```

### 2. Update Email Service
```javascript
// In emailService.js
import { API_BASE_URL } from '../config/api';

const response = await fetch(`${API_BASE_URL}/api/send-contact-email`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(emailData),
});
```

### 3. Environment Variables for Production
```
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=465
VITE_SMTP_USER=support@zipcodexpress.com
VITE_SMTP_PASS=your-app-specific-password
PORT=3001
```

## Cost Breakdown

### GoDaddy Shared Hosting: $2.99-$7.99/month
- Hosts your React frontend
- Domain included
- SSL certificate

### Railway Backend: $0-$5/month
- Free tier: 512MB RAM, $5 credit/month
- Handles email server
- Automatic deployments

### Total Monthly Cost: ~$3-$13/month

## Alternative: All-in-One GoDaddy VPS

If you prefer everything on GoDaddy:
- **VPS Hosting:** $4.99-$29.99/month
- **Pros:** Everything in one place
- **Cons:** More expensive, requires server management

## Security Considerations

1. **Use App-Specific Passwords** for Gmail SMTP
2. **Enable CORS** properly in production
3. **Use HTTPS** for all communications
4. **Store sensitive data** in environment variables only

## Testing Deployment

1. Test locally first: `npm run preview`
2. Test backend separately
3. Deploy frontend, then backend
4. Test contact form thoroughly
5. Monitor email delivery

Would you like me to help you set up any of these deployment options?
