// Web3Forms email service implementation
// Another reliable alternative to EmailJS

const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // You'll need to replace this

export const sendEmail = async (formData) => {
  try {
    console.log('Sending email via Web3Forms with data:', formData);
    
    // Prepare the data for Web3Forms
    const emailData = new FormData();
    emailData.append('access_key', WEB3FORMS_ACCESS_KEY);
    emailData.append('name', formData.name);
    emailData.append('email', formData.email);
    emailData.append('subject', `New Quote Request from ${formData.name} - ${formData.company}`);
    
    // Build a formatted message
    const message = `
New Quote Request Details:

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Phone: ${formData.phone}
Property Type: ${formData.propertyType}
Number of Units: ${formData.units}
Timeline: ${formData.timeline}
Budget: ${formData.budget}

Message:
${formData.message}
    `.trim();
    
    emailData.append('message', message);
    
    // Optional fields
    emailData.append('from_name', formData.name);
    emailData.append('replyto', formData.email);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: emailData
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(`Web3Forms error: ${result.message || 'Unknown error'}`);
    }

    console.log('Email sent successfully via Web3Forms:', result);
    
    return {
      success: true,
      message: 'Email sent successfully!',
      data: result
    };

  } catch (error) {
    console.error('Web3Forms email error:', error);
    
    // Return detailed error for debugging
    return {
      success: false,
      error: error.message,
      details: {
        service: 'Web3Forms',
        accessKey: WEB3FORMS_ACCESS_KEY ? 'Present' : 'Missing',
        formData: formData
      }
    };
  }
};

// Test function to verify the service is working
export const testEmailService = async () => {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      phone: '555-0123',
      propertyType: 'Apartment',
      units: '100',
      timeline: 'ASAP',
      budget: '$10,000-$25,000',
      message: 'This is a test message from the ZipcodeXpress website.'
    };

    const result = await sendEmail(testData);
    return result;
  } catch (error) {
    console.error('Email service test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
