// Quick debug utility to test SMTP configuration
import { buildApiUrl } from '../config/api.js';

export const testSMTPConfig = () => {
  console.log('🔍 Debugging SMTP Configuration:');
  console.log('SMTP Host:', import.meta.env.VITE_SMTP_HOST);
  console.log('SMTP Port:', import.meta.env.VITE_SMTP_PORT);
  console.log('SMTP User:', import.meta.env.VITE_SMTP_USER);
  console.log('SMTP Pass:', import.meta.env.VITE_SMTP_PASS ? '***configured***' : 'NOT SET');
  
  // Check if any are undefined/empty
  const host = import.meta.env.VITE_SMTP_HOST;
  const port = import.meta.env.VITE_SMTP_PORT;
  const user = import.meta.env.VITE_SMTP_USER;
  const pass = import.meta.env.VITE_SMTP_PASS;
  
  if (!host) {
    console.error('❌ SMTP Host is missing');
  }
  if (!port) {
    console.error('❌ SMTP Port is missing');
  }
  if (!user) {
    console.error('❌ SMTP User is missing');
  }
  if (!pass) {
    console.error('❌ SMTP Password is missing');
  }
  
  if (host && port && user && pass) {
    console.log('✅ All SMTP environment variables are set');
    return true;
  }
  
  console.log('❌ Some SMTP environment variables are missing');
  return false;
};

// Test if the backend server is running
export const testBackendConnection = async () => {
  try {
    const response = await fetch(buildApiUrl('/api/health'));
    const result = await response.json();
    console.log('✅ Backend server is running:', result);
    return true;
  } catch (error) {
    console.error('❌ Backend server is not running:', error.message);
    console.log('💡 Make sure to run: node server-simple.js');
    return false;
  }
};

// Check EmailJS configuration
export const checkEmailJSConfig = () => {
  console.log('\n🔍 Checking EmailJS configuration...');
  console.log('VITE_EMAILJS_SERVICE_ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing');
  console.log('VITE_EMAILJS_TEMPLATE_ID_CONTACT:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT ? '✅ Set' : '❌ Missing');
  console.log('VITE_EMAILJS_TEMPLATE_ID_REGISTRATION:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTRATION ? '✅ Set' : '❌ Missing');
  console.log('VITE_EMAILJS_PUBLIC_KEY:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? '✅ Set' : '❌ Missing');
};

// Simple minimal test function
export const testMinimalEmail = async () => {
  try {
    console.log('🧪 Testing minimal SMTP email...');
    
    const testData = {
      customerName: 'Test User',
      customerPhone: '123-456-7890',
      customerEmail: 'test@example.com',
      customerCity: 'Test City',
      customerState: 'CA',
      customerAddress: '123 Test St',
      apartmentUnits: '10',
      installationDate: '2025-08-01',
      comments: 'This is a test email from the registration form.'
    };
    
    const response = await fetch(buildApiUrl('/api/send-email'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Test email sent successfully:', result);
      return true;
    } else {
      console.error('❌ Test email failed:', result);
      return false;
    }
  } catch (error) {
    console.error('❌ Test email failed:', error);
    return false;
  }
};
