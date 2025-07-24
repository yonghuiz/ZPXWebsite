import React from 'react';
import './ProductPage.css';

const TakeoutLocker = () => {
  return (
    <div className="product-page">
      <section className="product-hero">
        <div className="product-hero__container">
          <h1 className="product-hero__title">Take-out Locker</h1>
          <p className="product-hero__subtitle">
            Smart food delivery solutions for restaurants and food service
          </p>
        </div>
      </section>

      <section className="product-content">
        <div className="product-content__container">
          <div className="product-overview">
            <h2>Revolutionize Food Delivery</h2>
            <p>
              Our take-out locker systems provide secure, temperature-controlled storage 
              for food deliveries, ensuring freshness and convenience for both restaurants 
              and customers. Perfect for busy establishments and food courts.
            </p>
          </div>

          <div className="product-features">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h4>Temperature Control</h4>
                <ul>
                  <li>Multiple temperature zones</li>
                  <li>Hot food compartments</li>
                  <li>Cold food storage</li>
                  <li>Ambient temperature options</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Smart Notifications</h4>
                <ul>
                  <li>SMS and app notifications</li>
                  <li>Order ready alerts</li>
                  <li>Pickup reminders</li>
                  <li>Restaurant dashboard</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Food Safety</h4>
                <ul>
                  <li>HACCP compliant design</li>
                  <li>Food-grade materials</li>
                  <li>Easy cleaning protocols</li>
                  <li>Temperature monitoring</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Integration Ready</h4>
                <ul>
                  <li>POS system integration</li>
                  <li>Delivery app compatibility</li>
                  <li>QR code ordering</li>
                  <li>Custom branding options</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="product-tech">
            <h2>Technical Specifications</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h4>Temperature Ranges</h4>
                <p>Hot: 140°F-180°F, Cold: 32°F-40°F, Ambient: 60°F-75°F</p>
              </div>
              <div className="tech-item">
                <h4>Capacity Options</h4>
                <p>6, 12, 18, 24, or 36 compartments with various size configurations</p>
              </div>
              <div className="tech-item">
                <h4>Access Methods</h4>
                <p>QR codes, mobile app, PIN codes, or staff access cards</p>
              </div>
              <div className="tech-item">
                <h4>Power Requirements</h4>
                <p>220V standard electrical connection with energy-efficient operation</p>
              </div>
            </div>
          </div>

          <div className="product-cta">
            <h2>Ready to Enhance Your Food Service?</h2>
            <p>
              Improve customer satisfaction and operational efficiency with our 
              take-out locker solutions designed specifically for food service.
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

export default TakeoutLocker;
