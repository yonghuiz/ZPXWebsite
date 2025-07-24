import React from 'react';
import { motion } from 'framer-motion';
import './MarketPage.css';

const Apartment = () => {
  return (
    <div className="market-page">
      <motion.section 
        className="market-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="market-hero__container">
          <div className="market-hero__content">
            <h1 className="market-hero__title">Apartment & Condo Solutions</h1>
            <p className="market-hero__subtitle">
              Streamline package management for residents and property managers
            </p>
          </div>
        </div>
      </motion.section>

      <section className="market-content">
        <div className="market-content__container">
          <div className="market-problems">
            <h2>Are You Facing These Challenges?</h2>
            <div className="problems-grid">
              <div className="problem-card">
                <h3>Property Manager</h3>
                <p>Do you feel your precious time is wasted everyday to sign and manage packages?</p>
              </div>
              <div className="problem-card">
                <h3>Residents</h3>
                <p>Have you ever lost your packages or unable to retrieve them after office hours?</p>
              </div>
            </div>
          </div>

          <div className="market-solution">
            <h2>Zippora is here to solve all the problems!</h2>
            
            <div className="solution-features">
              <div className="feature-item">
                <h4>24/7 Package Access</h4>
                <p>Residents can retrieve packages anytime, even after office hours</p>
              </div>
              <div className="feature-item">
                <h4>Automated Management</h4>
                <p>No more signing for packages or managing delivery schedules</p>
              </div>
              <div className="feature-item">
                <h4>Secure Storage</h4>
                <p>Packages are safely stored in locked compartments until pickup</p>
              </div>
              <div className="feature-item">
                <h4>Real-time Notifications</h4>
                <p>Instant alerts via email, SMS, and mobile app when packages arrive</p>
              </div>
            </div>
          </div>

          <div className="market-benefits">
            <h2>Benefits for Apartment Communities</h2>
            <ul className="benefits-list">
              <li>Reduce staff workload and increase efficiency</li>
              <li>Improve resident satisfaction and retention</li>
              <li>Eliminate package theft and lost deliveries</li>
              <li>Professional property management appearance</li>
              <li>24/7 access increases convenience</li>
              <li>Detailed reporting and analytics</li>
            </ul>
          </div>

          <div className="market-cta">
            <h2>Ready to Upgrade Your Package Management?</h2>
            <p>Join thousands of satisfied apartment communities using Zippora Smart Lockers</p>
            <div className="cta-buttons">
              <a href="/register" className="btn btn-primary">Request Quote</a>
              <a href="/contact-us" className="btn btn-outline">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apartment;
