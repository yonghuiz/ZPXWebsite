import React from 'react';
import { motion } from 'framer-motion';
import './MarketPage.css';

const School = () => {
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
            <h1 className="market-hero__title">School Campus Solutions</h1>
            <p className="market-hero__subtitle">
              Smart package and food delivery management for educational institutions
            </p>
          </div>
        </div>
      </motion.section>

      <section className="market-content">
        <div className="market-content__container">
          <div className="market-problems">
            <h2>Campus Delivery Challenges</h2>
            <div className="problems-grid">
              <div className="problem-card">
                <h3>School Faculty</h3>
                <p>Do you feel tedious to handle tons of packages every day for all the teachers and students?</p>
              </div>
              <div className="problem-card">
                <h3>Students</h3>
                <p>Do you often have food delivered to campus yet you are right in the middle of a class?</p>
              </div>
            </div>
          </div>

          <div className="market-solution">
            <h2>Zippora Campus Solutions</h2>
            
            <div className="solution-features">
              <div className="feature-item">
                <h4>Automated Package Handling</h4>
                <p>No more staff time wasted managing deliveries for students and faculty</p>
              </div>
              <div className="feature-item">
                <h4>Flexible Food Delivery</h4>
                <p>Students can order food and pick up between classes at their convenience</p>
              </div>
              <div className="feature-item">
                <h4>Campus Security</h4>
                <p>Controlled access ensures only authorized individuals can retrieve packages</p>
              </div>
              <div className="feature-item">
                <h4>Study-Friendly</h4>
                <p>No interruptions during classes or study sessions</p>
              </div>
            </div>
          </div>

          <div className="market-benefits">
            <h2>Educational Institution Benefits</h2>
            <ul className="benefits-list">
              <li>Reduce administrative workload for staff</li>
              <li>Improve student satisfaction and campus experience</li>
              <li>Enable flexible food and package delivery</li>
              <li>Enhance campus security and access control</li>
              <li>Support 24/7 access for residential students</li>
              <li>Modern technology enhances school image</li>
            </ul>
          </div>

          <div className="market-cta">
            <h2>Modernize Your Campus Delivery System</h2>
            <p>Join forward-thinking educational institutions using Zippora Smart Lockers</p>
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

export default School;
