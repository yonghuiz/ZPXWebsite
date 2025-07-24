import React from 'react';
import { motion } from 'framer-motion';
import './ProductPage.css';

const PackageLocker = () => {
  return (
    <div className="product-page">
      <motion.section 
        className="product-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="product-hero__container">
          <div className="product-hero__content">
            <h1 className="product-hero__title">ZIPPORA Package Locker</h1>
            <p className="product-hero__subtitle">
              General package smart locker product and service
            </p>
          </div>
        </div>
      </motion.section>

      <section className="product-content">
        <div className="product-content__container">
          <div className="product-overview">
            <h2>Smart Locker Technology</h2>
            <p>Our flagship ZIPPORA package locker system provides comprehensive package management solutions for any environment. With advanced technology and user-friendly interfaces, ZIPPORA makes package delivery and retrieval seamless and secure.</p>
          </div>

          <div className="product-features">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h4>Multiple Access Methods</h4>
                <ul>
                  <li>QR Code scanning</li>
                  <li>Access code input</li>
                  <li>IC Card reader</li>
                  <li>Mobile app integration</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Various Locker Sizes</h4>
                <ul>
                  <li>Small (S) - Documents, letters</li>
                  <li>Medium (M) - Standard packages</li>
                  <li>Large (L) - Clothing, books</li>
                  <li>Extra Large (XL) - Electronics</li>
                  <li>XXL - Large packages</li>
                  <li>Oversize - Custom dimensions</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Security Features</h4>
                <ul>
                  <li>24/7 video surveillance</li>
                  <li>Motion capture technology</li>
                  <li>48-hour playback capability</li>
                  <li>Live mobile app monitoring</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Notification System</h4>
                <ul>
                  <li>Email notifications</li>
                  <li>SMS text messaging</li>
                  <li>Mobile app alerts</li>
                  <li>No delay notifications</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="product-tech">
            <h2>ZIPPORA Smart Technologies</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h4>Mobile App</h4>
                <p>Android and iOS applications available. User-friendly interface allows property management to post notifications and ads. Download to experience the convenience!</p>
              </div>
              <div className="tech-item">
                <h4>IC Card Reader</h4>
                <p>Property managers can scan IC cards to log in and manage all parcel lockers through the touchscreen. Admin codes also available for management access.</p>
              </div>
              <div className="tech-item">
                <h4>QR Code Scanner</h4>
                <p>ZipcodeXpress is the first and only package locker company to provide QR code retrieval. Recipients simply scan QR codes via the mobile app.</p>
              </div>
              <div className="tech-item">
                <h4>Access Code Login</h4>
                <p>Multiple access options: QR code scanning or access code input. Codes sent via email, SMS, and mobile app with no notification delays.</p>
              </div>
            </div>
          </div>

          <div className="product-cta">
            <h2>Ready to Install ZIPPORA Lockers?</h2>
            <p>Join thousands of satisfied customers using our flagship package locker system</p>
            <div className="cta-buttons">
              <a href="/request-for-quote" className="btn btn-primary">Get Quote</a>
              <a href="/contact-us" className="btn btn-outline">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageLocker;
