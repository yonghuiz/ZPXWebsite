// Formspree email service implementation
// Alternative to EmailJS when their service is down

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID';

export const sendEmail = async (formData) => {
  try {
    console.log('Sending email via Formspree with data:', formData);
    
    // Prepare the data for Formspree
    const emailData = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      propertyType: formData.propertyType,
      units: formData.units,
      timeline: formData.timeline,
      budget: formData.budget,
      message: formData.message,
      // Add a subject line
      _subject: `New Quote Request from ${formData.name} - ${formData.company}`,
      // Optional: Add a reply-to field
      _replyto: formData.email,
      // Optional: Redirect after submission (can be left empty for AJAX)
      _next: window.location.origin + '/thank-you'
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
    console.log('Email sent successfully via Formspree:', result);
    
    return {
      success: true,
      message: 'Email sent successfully!',
      data: result
    };

  } catch (error) {
    console.error('Formspree email error:', error);
    
    // Return detailed error for debugging
    return {
      success: false,
      error: error.message,
      details: {
        service: 'Formspree',
        endpoint: FORMSPREE_ENDPOINT,
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
