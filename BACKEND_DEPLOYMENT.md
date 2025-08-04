# Railway Deployment Script

## Environment Variables Required:
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=465
VITE_SMTP_USER=support@zipcodexpress.com
VITE_SMTP_PASS=your-app-password
PORT=3001

## Deployment Steps:

1. Push your code to GitHub
2. Connect Railway to your GitHub repository
3. Set the start command: `node server-simple.js`
4. Add the environment variables above
5. Deploy automatically

## For Vercel Deployment:
Create vercel.json in root:

{
  "functions": {
    "server-simple.js": {
      "runtime": "@vercel/node"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server-simple.js"
    }
  ]
}
