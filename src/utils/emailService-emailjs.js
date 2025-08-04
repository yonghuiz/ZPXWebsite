// EmailJS-only email service for GoDaddy deployment (no backend required)
import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
    console.log('✅ EmailJS initialized');
    console.log('📧 EmailJS Configuration:');
    console.log('- Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing');
    console.log('- Contact Template:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT ? '✅ Set' : '❌ Missing');
    console.log('- Registration Template:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTRATION ? '✅ Set' : '❌ Missing');
    console.log('- Public Key:', publicKey ? '✅ Set' : '❌ Missing');
    console.log('- Environment:', import.meta.env.MODE);
    console.log('- All Env Vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  } else {
    console.error('❌ EmailJS public key not found in environment variables');
    console.error('Please configure VITE_EMAILJS_PUBLIC_KEY in your .env file');
  }
};

// Initialize EmailJS on module load
initEmailJS();

// Send email via EmailJS
const sendEmailViaEmailJS = async (templateParams, templateType) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = templateType === 'contact' 
      ? import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT
      : import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTRATION;

    if (!serviceId) {
      throw new Error('EmailJS service ID not configured. Please set VITE_EMAILJS_SERVICE_ID in .env');
    }
    
    if (!templateId) {
      throw new Error(`EmailJS template ID not configured. Please set VITE_EMAILJS_TEMPLATE_ID_${templateType.toUpperCase()} in .env`);
    }

    console.log('📧 Sending email via EmailJS...');
    console.log('Service ID:', serviceId);
    console.log('Template ID:', templateId);
    console.log('Template params:', templateParams);

    const result = await emailjs.send(serviceId, templateId, templateParams);
    
    console.log('✅ EmailJS send result:', result);
    return {
      success: true,
      result: result
    };
  } catch (error) {
    console.error('❌ EmailJS error:', error);
    
    // Handle specific error types
    let errorMessage = 'Unknown EmailJS error';
    
    if (error.message && error.message.includes('Failed to fetch')) {
      errorMessage = 'Network connection error. Please check your internet connection and try again.';
    } else if (error.status === 422) {
      errorMessage = 'Email template configuration error. Please contact support.';
    } else if (error.status === 400) {
      errorMessage = 'Invalid email data. Please check your form inputs.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Test EmailJS connection
export const testEmailJS = async () => {
  console.log('🧪 Testing EmailJS connection...');
  
  try {
    const testParams = {
      customer_name: 'Test User',
      customer_email: 'test@example.com',
      customer_phone: '123-456-7890',
      customer_city: 'Test City',
      customer_address: 'Test Address',
      apartment_units: '1',
      installation_date: 'Test Date',
      comments: 'This is a test email',
      to_email: 'support@zipcodexpress.com'
    };

    const result = await sendEmailViaEmailJS(testParams, 'registration');
    console.log('✅ EmailJS test successful:', result);
    return result;
  } catch (error) {
    console.error('❌ EmailJS test failed:', error);
    throw error;
  }
};

// Send registration email (EmailJS only)
export const sendRegistrationEmail = async (formData) => {
  console.log('📝 sendRegistrationEmail called with:', formData);
  
  const templateParams = {
    customer_name: formData.name,
    customer_email: formData.email,
    customer_phone: formData.phone,
    customer_city: formData.city,
    customer_address: formData.address,
    apartment_units: formData.apartmentUnits,
    installation_date: formData.installationDate || 'Not specified',
    comments: formData.comments || 'No additional comments',
    to_email: 'support@zipcodexpress.com'
  };

  console.log('🚀 Sending registration email via EmailJS...');
  
  const result = await sendEmailViaEmailJS(templateParams, 'registration');
  
  if (!result.success) {
    throw new Error(`Failed to send registration email: ${result.error}`);
  }
  
  console.log('✅ Registration email sent successfully');
  return result;
  
  if (result.success) {
    console.log('✅ Registration email sent successfully via EmailJS');
    return {
      success: true,
      message: 'Registration email sent successfully to support@zipcodexpress.com!'
    };
  } else {
    console.error('❌ EmailJS failed:', result.error);
    throw new Error(`Failed to send registration email: ${result.error}`);
  }
};

// Send contact email (EmailJS only)
export const sendContactEmail = async (formData) => {
  console.log('📞 sendContactEmail called with:', formData);
  
  const templateParams = {
    customer_name: formData.name,
    customer_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: 'support@zipcodexpress.com'
  };

  console.log('🚀 Sending contact email via EmailJS...');
  
  const result = await sendEmailViaEmailJS(templateParams, 'contact');
  
  if (result.success) {
    console.log('✅ Contact email sent successfully via EmailJS');
    return {
      success: true,
      message: 'Contact email sent successfully to support@zipcodexpress.com!'
    };
  } else {
    console.error('❌ EmailJS failed:', result.error);
    throw new Error(`Failed to send contact email: ${result.error}`);
  }
};

// Debug function to check EmailJS configuration
export const checkEmailJSConfig = () => {
  console.log('\n🔍 EmailJS Configuration Check:');
  console.log('VITE_EMAILJS_SERVICE_ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing');
  console.log('VITE_EMAILJS_TEMPLATE_ID_CONTACT:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT ? '✅ Set' : '❌ Missing');
  console.log('VITE_EMAILJS_TEMPLATE_ID_REGISTRATION:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTRATION ? '✅ Set' : '❌ Missing');
  console.log('VITE_EMAILJS_PUBLIC_KEY:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? '✅ Set' : '❌ Missing');
  
  const allConfigured = import.meta.env.VITE_EMAILJS_SERVICE_ID && 
                       import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT && 
                       import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTRATION && 
                       import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  if (allConfigured) {
    console.log('✅ All EmailJS configuration is set!');
    return true;
  } else {
    console.log('❌ Some EmailJS configuration is missing. Please check your .env file.');
    return false;
  }
};
