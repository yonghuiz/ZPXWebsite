// Email service utility
// This can be configured to use different email services

import emailjs from '@emailjs/browser';

// Initialize EmailJS (call this in your main.jsx or App.jsx)
export const initEmailService = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey && publicKey !== 'your_public_key') {
    emailjs.init(publicKey);
  }
};

// Send email using EmailJS
export const sendEmailViaEmailJS = async (templateParams) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey || 
      serviceId === 'service_default' || 
      templateId === 'template_default' || 
      publicKey === 'your_public_key') {
    throw new Error('EmailJS configuration is incomplete. Please check your .env file.');
  }

  return await emailjs.send(serviceId, templateId, templateParams, publicKey);
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

// Main email sending function - automatically chooses the best method
export const sendRegistrationEmail = async (formData) => {
  const emailData = {
    to: 'support@zipcodexpress.com',
    subject: 'New Locker Registration Request',
    customerName: formData.name,
    customerPhone: formData.phone,
    customerEmail: formData.email,
    customerCity: formData.city,
    customerAddress: formData.address,
    apartmentUnits: formData.apartmentUnits,
    installationDate: formData.installationDate || 'Not specified',
    comments: formData.comments || 'No additional comments'
  };

  // Try EmailJS first
  try {
    const templateParams = {
      to_email: emailData.to,
      from_name: emailData.customerName,
      from_email: emailData.customerEmail,
      customer_name: emailData.customerName,
      customer_phone: emailData.customerPhone,
      customer_email: emailData.customerEmail,
      customer_city: emailData.customerCity,
      customer_address: emailData.customerAddress,
      apartment_units: emailData.apartmentUnits,
      installation_date: emailData.installationDate,
      comments: emailData.comments,
      subject: emailData.subject,
      message: `
New Locker Registration Request

Customer Details:
- Name: ${emailData.customerName}
- Phone: ${emailData.customerPhone}
- Email: ${emailData.customerEmail}
- City: ${emailData.customerCity}
- Address: ${emailData.customerAddress}

Property Information:
- Number of Apartment Units: ${emailData.apartmentUnits}
- Preferred Installation Date: ${emailData.installationDate}

Additional Comments:
${emailData.comments}

Please contact this customer to discuss their locker requirements.
      `.trim()
    };

    return await sendEmailViaEmailJS(templateParams);
  } catch (emailJSError) {
    console.warn('EmailJS failed, trying custom SMTP:', emailJSError.message);
    
    // Fallback to custom SMTP if EmailJS fails
    try {
      return await sendEmailViaCustomSMTP(emailData);
    } catch (smtpError) {
      console.error('Both email methods failed:', { emailJSError, smtpError });
      throw new Error('Unable to send email. Please contact support directly.');
    }
  }
};
