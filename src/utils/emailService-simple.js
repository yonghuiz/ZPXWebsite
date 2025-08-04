// Simple email service using form submission
// Alternative when EmailJS has SSL issues

export const sendEmailViaSimpleForm = async (formData) => {
  try {
    // Use a simple form submission service (Netlify Forms compatible)
    const formBody = new FormData();
    formBody.append('name', formData.name);
    formBody.append('email', formData.email);
    formBody.append('phone', formData.phone);
    formBody.append('city', formData.city);
    formBody.append('address', formData.address);
    formBody.append('apartmentUnits', formData.apartmentUnits);
    formBody.append('installationDate', formData.installationDate || 'Not specified');
    formBody.append('comments', formData.comments || 'No additional comments');
    formBody.append('form-name', 'zipcodexpress-registration');
    formBody.append('_subject', `New Registration: ${formData.name} - ${formData.city}`);
    
    // Try Formspree as backup
    const formspreeEndpoint = 'https://formspree.io/f/mdkdlvob'; // Temporary endpoint
    
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: formBody,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Registration submitted successfully!'
      };
    } else {
      throw new Error(`Form submission failed: ${response.statusText}`);
    }

  } catch (error) {
    throw error;
  }
};

// Export for use in main email service
export default sendEmailViaSimpleForm;
