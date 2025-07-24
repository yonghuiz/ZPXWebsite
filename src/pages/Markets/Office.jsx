import React from 'react';
import { motion } from 'framer-motion';
import './MarketPage.css';

const Office = () => {
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
            <h1 className="market-hero__title">Office Building Solutions</h1>
            <p className="market-hero__subtitle">
              Secure and efficient package management for office environments
            </p>
          </div>
        </div>
      </motion.section>

      <section className="market-content">
        <div className="market-content__container">
          <div className="market-problems">
            <h2>Office Package Management Challenges</h2>
            <div className="problems-grid">
              <div className="problem-card">
                <h3>Property Manager</h3>
                <p>Do you feel the property is not secured when carriers visit offices to deliver packages?</p>
              </div>
              <div className="problem-card">
                <h3>Employees</h3>
                <p>Are you concerned about your privacy when colleagues sign packages for you?</p>
              </div>
            </div>
          </div>

          <div className="market-solution">
            <h2>Zippora Office Solutions</h2>
            
            <div className="solution-features">
              <div className="feature-item">
                <h4>Enhanced Security</h4>
                <p>Controlled access prevents unauthorized personnel from entering office areas</p>
              </div>
              <div className="feature-item">
                <h4>Privacy Protection</h4>
                <p>Personal packages remain confidential with individual locker access</p>
              </div>
              <div className="feature-item">
                <h4>Reception Relief</h4>
                <p>Reduce front desk workload and improve professional appearance</p>
              </div>
              <div className="feature-item">
                <h4>Flexible Access</h4>
                <p>Employees can retrieve packages at their convenience</p>
              </div>
            </div>
          </div>

          <div className="market-benefits">
            <h2>Office Building Benefits</h2>
            <ul className="benefits-list">
              <li>Improved building security and access control</li>
              <li>Enhanced employee privacy and satisfaction</li>
              <li>Reduced reception desk interruptions</li>
              <li>Professional corporate image</li>
              <li>Streamlined delivery processes</li>
              <li>Real-time package tracking and notifications</li>
            </ul>
          </div>

          <div className="market-cta">
            <h2>Upgrade Your Office Package System</h2>
            <p>Join leading companies using Zippora Smart Lockers for secure office deliveries</p>
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

export default Office;
