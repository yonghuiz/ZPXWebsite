import React from 'react';
import { motion } from 'framer-motion';
import './MarketPage.css';

const GroceryStore = () => {
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
            <h1 className="market-hero__title">Grocery Store Solutions</h1>
            <p className="market-hero__subtitle">
              Revolutionize grocery pickup with smart locker technology
            </p>
          </div>
        </div>
      </motion.section>

      <section className="market-content">
        <div className="market-content__container">
          <div className="market-problems">
            <h2>Grocery Store Challenges</h2>
            <div className="problems-grid">
              <div className="problem-card">
                <h3>Store Manager</h3>
                <p>Don't you think you are spending too much time on helping customers to pickup their groceries?</p>
              </div>
              <div className="problem-card">
                <h3>Grocery Shopper</h3>
                <p>Do you feel you have wasted too much time on pushing a shopping cart around and waiting to pay?</p>
              </div>
            </div>
          </div>

          <div className="market-solution">
            <h2>Zippora Grocery Solutions</h2>
            
            <div className="solution-features">
              <div className="feature-item">
                <h4>Click & Collect</h4>
                <p>Customers order online and pick up from secure refrigerated lockers</p>
              </div>
              <div className="feature-item">
                <h4>Staff Efficiency</h4>
                <p>Reduce time spent on customer assistance and order management</p>
              </div>
              <div className="feature-item">
                <h4>Temperature Control</h4>
                <p>Refrigerated lockers keep perishables fresh until pickup</p>
              </div>
              <div className="feature-item">
                <h4>24/7 Pickup</h4>
                <p>Customers can retrieve groceries anytime, even after store hours</p>
              </div>
            </div>
          </div>

          <div className="market-benefits">
            <h2>Grocery Retail Benefits</h2>
            <ul className="benefits-list">
              <li>Increase operational efficiency and reduce staff workload</li>
              <li>Improve customer convenience and satisfaction</li>
              <li>Enable contactless shopping experiences</li>
              <li>Extend service hours beyond store operation</li>
              <li>Reduce checkout lines and store congestion</li>
              <li>Modern technology attracts tech-savvy customers</li>
            </ul>
          </div>

          <div className="market-cta">
            <h2>Transform Your Grocery Business</h2>
            <p>Join innovative retailers using Zippora Smart Lockers for grocery pickup</p>
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

export default GroceryStore;
