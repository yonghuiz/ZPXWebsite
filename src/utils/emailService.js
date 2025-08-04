// Email service utility
// This can be configured to use different email services

import emailjs from '@emailjs/browser';
import { buildApiUrl, EMAIL_ENDPOINT, REGISTRATION_ENDPOINT } from '../config/api';
import sendEmailViaSimpleForm from './emailService-simple.js';

// Initialize EmailJS (call this in your main.jsx or App.jsx)
export const initEmailService = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  if (publicKey && publicKey !== 'your_public_key') {
    emailjs.init(publicKey);
  }
};

// Send email using EmailJS
export const sendEmailViaEmailJS = async (templateParams) => {
  // Use different template IDs for contact vs registration
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const isRegistration = templateParams.customer_name !== undefined;
  const templateId = isRegistration 
    ? import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTRATION 
    : import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey || 
      serviceId === 'service_default' || 
      templateId === 'template_default' || 
      publicKey === 'your_public_key') {
    throw new Error('EmailJS configuration is incomplete. Please check your .env file.');
  }
  
  try {
    const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return {
      success: true,
      message: 'Email sent successfully!',
      result
    };
  } catch (error) {
    // Try with simpler template if the main one fails
    try {
      const simpleParams = {
        to_email: 'support@zipcodexpress.com',
        from_name: templateParams.customer_name,
        from_email: templateParams.customer_email,
        message: `New Registration: ${templateParams.customer_name} - ${templateParams.customer_email} - ${templateParams.customer_phone}`
      };
      
      const fallbackResult = await emailjs.send(serviceId, templateId, simpleParams, publicKey);
      return {
        success: true,
        message: 'Email sent successfully (simplified)!',
        result: fallbackResult
      };
    } catch (fallbackError) {
      throw new Error(`EmailJS failed: ${fallbackError.text || fallbackError.message || 'Unknown error'}`);
    }
  }
};

// Alternative: Send email using your custom SMTP server
export const sendEmailViaCustomSMTP = async (emailData) => {
  // This would typically call your backend API endpoint
  // that handles SMTP email sending
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    throw new Error('Failed to send email via SMTP');
  }

  return response.json();
};

// Send contact email via Formspree (temporary replacement for EmailJS)
export const sendContactViaFormspree = async (formData) => {
  // Use form endpoint from .env file
  const FORMSPREE_CONTACT_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID';
  
  try {
    const emailData = {
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not provided',
      phone: formData.phone || 'Not provided',
      message: formData.message,
      _subject: `Contact Form: ${formData.name} - ${formData.company || 'No Company'}`,
      _replyto: formData.email,
    };

    const response = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Formspree error: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      message: 'Contact message sent successfully!',
      result
    };

  } catch (error) {
    throw new Error(`Failed to send contact email via Formspree: ${error.message}`);
  }
};

// Main email sending function - uses EmailJS first (now restored), Formspree as backup
export const sendContactEmail = async (formData) => {
  // Try EmailJS first (service restored)
  try {
    const templateParams = {
      customer_name: formData.name,
      customer_email: formData.email,
      subject: formData.subject || 'Contact Form Submission',
      message: formData.message,
      to_email: 'support@zipcodexpress.com'
    };

    const result = await sendEmailViaEmailJS(templateParams);
    
    if (result.success) {
      return {
        success: true,
        message: 'Contact message sent successfully to support@zipcodexpress.com!'
      };
    } else {
      throw new Error('EmailJS failed');
    }

  } catch (emailjsError) {
    
    // Fallback to Formspree if EmailJS fails
    try {
      const result = await sendContactViaFormspree(formData);
      
      if (result.success) {
        return {
          success: true,
          message: 'Contact message sent successfully to support@zipcodexpress.com!'
        };
      } else {
        throw new Error('Formspree also failed');
      }

    } catch (formspreeError) {
      
      // Fallback to SMTP backend if both EmailJS and Formspree fail
      const emailData = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message
      };

      try {
        const response = await fetch(buildApiUrl(EMAIL_ENDPOINT), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to send contact email via SMTP');
        }

        console.log('✅ Contact email sent successfully via SMTP:', result);
        return {
          success: true,
          message: 'Contact message sent successfully to support@zipcodexpress.com!'
        };

      } catch (smtpError) {
        throw new Error(`Failed to send contact email: ${smtpError.message}`);
      }
    }
  }
};

// Send via Formspree (temporary replacement for EmailJS)
export const sendEmailViaFormspree = async (formData) => {
  // Use form endpoint from .env file
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID';
  
  try {
    const emailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      apartmentUnits: formData.apartmentUnits,
      installationDate: formData.installationDate || 'Not specified',
      comments: formData.comments || 'No additional comments',
      _subject: `New Registration: ${formData.name} - ${formData.city}`,
      _replyto: formData.email,
    };

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Formspree error: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      message: 'Registration email sent successfully!',
      result
    };

  } catch (error) {
    throw new Error(`Failed to send email via Formspree: ${error.message}`);
  }
};

// Main email sending function - uses EmailJS first (now restored), Formspree as backup
export const sendRegistrationEmail = async (formData) => {
  // Try EmailJS first (service restored)
  try {
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

    const result = await sendEmailViaEmailJS(templateParams);
    
    if (result.success) {
      return {
        success: true,
        message: 'Registration email sent successfully to support@zipcodexpress.com!'
      };
    } else {
      throw new Error('EmailJS failed');
    }

  } catch (emailjsError) {
    
    // Check if it's a network error (SSL protocol error shows as "Failed to fetch")
    if (emailjsError.message && (emailjsError.message.includes('Failed to fetch') || emailjsError.message.includes('SSL'))) {
      try {
        const result = await sendEmailViaSimpleForm(formData);
        if (result.success) {
          return {
            success: true,
            message: 'Registration submitted successfully to support@zipcodexpress.com!'
          };
        }
      } catch (simpleFormError) {
        // Continue to Formspree fallback
      }
    }
    
    // Fallback to Formspree if EmailJS fails
    try {
      const result = await sendEmailViaFormspree(formData);
      
      if (result.success) {
        return {
          success: true,
          message: 'Registration email sent successfully to support@zipcodexpress.com!'
        };
      } else {
        throw new Error('Formspree also failed');
      }

    } catch (formspreeError) {
      
      // Fallback to SMTP backend if both EmailJS and Formspree fail
      const emailData = {
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        customerCity: formData.city,
        customerAddress: formData.address,
        apartmentUnits: formData.apartmentUnits,
        installationDate: formData.installationDate || 'Not specified',
        comments: formData.comments || 'No additional comments'
      };

      try {
        const response = await fetch(buildApiUrl(REGISTRATION_ENDPOINT), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to send email via SMTP');
        }

        console.log('✅ Registration email sent successfully via SMTP:', result);
        return {
          success: true,
          message: 'Registration email sent successfully to support@zipcodexpress.com!'
        };

      } catch (smtpError) {
        throw new Error(`Failed to send registration email: ${smtpError.message}`);
      }
    }
  }
};
