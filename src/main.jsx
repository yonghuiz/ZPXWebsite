import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import 'antd/dist/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { initEmailService } from './utils/emailService'

// Initialize email service
initEmailService();

// Default messages for internationalization
const messages = {
  'page.login': 'Sign In',
  'page.user.email': 'Enter your email',
  'page.user.password': 'Enter your password',
  'page.login.forgotpassword': 'Forgot password?',
  'page.login.register': 'Register here'
};

// Set up global appLocale for backward compatibility
window.appLocale = { messages };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IntlProvider locale="en" messages={messages}>
      <App />
    </IntlProvider>
  </StrictMode>,
)
