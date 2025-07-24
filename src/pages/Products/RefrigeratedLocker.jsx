import React from 'react';
import './ProductPage.css';

const RefrigeratedLocker = () => {
  return (
    <div className="product-page">
      <section className="product-hero">
        <div className="product-hero__container">
          <h1 className="product-hero__title">Refrigerated Locker</h1>
          <p className="product-hero__subtitle">
            Cold storage solutions for temperature-sensitive deliveries
          </p>
        </div>
      </section>

      <section className="product-content">
        <div className="product-content__container">
          <div className="product-overview">
            <h2>Keep It Cool, Keep It Fresh</h2>
            <p>
              Our refrigerated locker systems maintain precise temperature control 
              for perishable items, pharmaceuticals, groceries, and other temperature-sensitive 
              deliveries. Ensure product integrity from delivery to pickup.
            </p>
          </div>

          <div className="product-features">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h4>Precise Temperature Control</h4>
                <ul>
                  <li>Maintains 35°F - 40°F range</li>
                  <li>Digital temperature monitoring</li>
                  <li>Automatic backup systems</li>
                  <li>Temperature logging and alerts</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Energy Efficient</h4>
                <ul>
                  <li>LED lighting systems</li>
                  <li>High-efficiency compressors</li>
                  <li>Insulated construction</li>
                  <li>Smart power management</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Security Features</h4>
                <ul>
                  <li>Secure access controls</li>
                  <li>Tamper-proof design</li>
                  <li>Activity monitoring</li>
                  <li>Backup power options</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Compliance Ready</h4>
                <ul>
                  <li>FDA compliant materials</li>
                  <li>Pharmaceutical grade options</li>
                  <li>USDA food safety standards</li>
                  <li>Chain of custody tracking</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="product-tech">
            <h2>Technical Specifications</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h4>Temperature Range</h4>
                <p>Maintains consistent 35°F to 40°F with ±2°F accuracy</p>
              </div>
              <div className="tech-item">
                <h4>Capacity Options</h4>
                <p>4, 8, 16, or 24 refrigerated compartments in various sizes</p>
              </div>
              <div className="tech-item">
                <h4>Monitoring System</h4>
                <p>24/7 remote monitoring with real-time alerts and data logging</p>
              </div>
              <div className="tech-item">
                <h4>Backup Systems</h4>
                <p>Battery backup and generator compatibility for power outages</p>
              </div>
            </div>
          </div>

          <div className="product-cta">
            <h2>Protect Your Temperature-Sensitive Items</h2>
            <p>
              Ensure the integrity of your cold chain with our reliable refrigerated 
              locker solutions designed for critical temperature control.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">Request Demo</a>
              <a href="/contact" className="btn btn-secondary">Get Quote</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefrigeratedLocker;
