import React, { useState } from 'react';
import './ContactPage.css';
import { sendContactEmail } from '../../utils/emailService.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', or ''

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      console.log('Submitting contact form:', formData);
      
      // Prepare data with subject field for EmailJS
      const emailData = {
        name: formData.name,
        email: formData.email,
        subject: formData.company ? `Contact from ${formData.company}` : 'Website Contact',
        message: `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not specified'}
Phone: ${formData.phone || 'Not specified'}

Message:
${formData.message}
        `.trim()
      };
      
      // Send email via EmailJS
      const result = await sendContactEmail(emailData);
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero__container">
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__subtitle">
            Get in touch with our team to learn more about our package locker solutions
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-content__container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Ready to transform your package management? Our team is here to help
                you find the perfect solution for your needs.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <h4>Sales Inquiries</h4>
                  <p>sales@zipcodexpress.com</p>
                  <p>(800)883-9662 ext 2</p>
                </div>

                <div className="contact-method">
                  <h4>Technical Support</h4>
                  <p>support@zipcodexpress.com</p>
                  <p>(800)883-9662 ext 1</p>
                </div>

                <div className="contact-method">
                  <h4>General Information</h4>
                  <p>info@zipcodexpress.com</p>
                  <p>(800)883-9662</p>
                </div>

                <div className="contact-method">
                  <h4>Business Hours</h4>
                  <p>Monday - Saturday: 1:00 AM - 8:00 PM CST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>


            </div>

            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="alert alert-success">
                    <strong>Thank you!</strong> Your message has been sent successfully. We will get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-error">
                    <strong>Error:</strong> There was a problem sending your message. Please try again or contact us directly at support@zipcodexpress.com.
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`btn btn-primary ${isSubmitting ? 'btn-loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
