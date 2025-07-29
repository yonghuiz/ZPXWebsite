import React, { useState } from 'react';
import { sendRegistrationEmail } from '../../utils/emailService';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    address: '',
    apartmentUnits: '',
    installationDate: '',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using the email service utility
      await sendRegistrationEmail(formData);
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          state: '',
          address: '',
          apartmentUnits: '',
          installationDate: '',
          comments: ''
        });
        setSubmitStatus(null);
      }, 3000);

    } catch (error) {
      console.error('Registration email failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <section className="register-banner">
        <div className="register-banner__container">
          <img 
            src="/images/locker-line-up@2x-1-2048x882.png" 
            alt="Locker Line Up"
            className="register-banner-image"
          />
          <div className="register-banner__overlay">
            <h1 className="register-banner__title">Register For Free Locker</h1>
            <p className="register-banner__subtitle">
              Please answer below questions, we will discuss with you about the number of locker units you need and the models.
            </p>
          </div>
        </div>
      </section>

      <section className="register-content">
        <div className="register-content__container">
          <div className="register-form-wrapper">
            <div className="register-form">
              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Your Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    Your City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your city"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Your Complete Address <span className="required">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                    placeholder="Enter your complete address"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apartmentUnits" className="form-label">
                    How many apartment units do you have? <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="apartmentUnits"
                    name="apartmentUnits"
                    value={formData.apartmentUnits}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter number of units"
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="installationDate" className="form-label">
                    How soon do you want the locker to be installed? (mm/dd/yyyy)
                  </label>
                  <input
                    type="date"
                    id="installationDate"
                    name="installationDate"
                    value={formData.installationDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="comments" className="form-label">
                    Extra Comments
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Any additional comments or requirements"
                    rows="4"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="form-message form-message--success">
                    Thank you! Your registration request has been submitted. We will contact you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message form-message--error">
                    There was an error submitting your request. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`form-submit ${isSubmitting ? 'form-submit--loading' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
