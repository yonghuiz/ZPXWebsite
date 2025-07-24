import React, { useState } from 'react';
import './ContactPage.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
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
                  <p>(555) 123-4567</p>
                </div>

                <div className="contact-method">
                  <h4>Technical Support</h4>
                  <p>support@zipcodexpress.com</p>
                  <p>(555) 234-5678</p>
                </div>

                <div className="contact-method">
                  <h4>General Information</h4>
                  <p>info@zipcodexpress.com</p>
                  <p>(555) 345-6789</p>
                </div>

                <div className="contact-method">
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 9:00 AM - 2:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="office-info">
                <h4>Corporate Headquarters</h4>
                <p>
                  123 Technology Drive<br />
                  Suite 456<br />
                  Innovation City, IC 12345<br />
                  United States
                </p>
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
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
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
