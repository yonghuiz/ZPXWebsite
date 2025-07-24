import React from 'react';
import './ProductPage.css';

const AssetManagement = () => {
  return (
    <div className="product-page">
      <section className="product-hero">
        <div className="product-hero__container">
          <h1 className="product-hero__title">Asset Management & Tools Rental Locker</h1>
          <p className="product-hero__subtitle">
            Smart inventory control and tool rental management solutions
          </p>
        </div>
      </section>

      <section className="product-content">
        <div className="product-content__container">
          <div className="product-overview">
            <h2>Streamline Asset Control</h2>
            <p>
              Our asset management locker systems provide secure storage and automated 
              tracking for tools, equipment, and valuable assets. Perfect for construction 
              sites, manufacturing facilities, universities, and rental businesses.
            </p>
          </div>

          <div className="product-features">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h4>Automated Tracking</h4>
                <ul>
                  <li>RFID and barcode scanning</li>
                  <li>Real-time inventory updates</li>
                  <li>Check-in/check-out logging</li>
                  <li>Asset location tracking</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>User Management</h4>
                <ul>
                  <li>Employee access controls</li>
                  <li>Authorization levels</li>
                  <li>Usage reporting</li>
                  <li>Accountability tracking</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Inventory Control</h4>
                <ul>
                  <li>Low stock alerts</li>
                  <li>Maintenance scheduling</li>
                  <li>Calibration reminders</li>
                  <li>Replacement notifications</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Rental Management</h4>
                <ul>
                  <li>Rental duration tracking</li>
                  <li>Automated billing integration</li>
                  <li>Late return notifications</li>
                  <li>Damage assessment tools</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="product-tech">
            <h2>Technical Specifications</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h4>Compartment Sizes</h4>
                <p>Customizable compartments from small tools to large equipment</p>
              </div>
              <div className="tech-item">
                <h4>Security Features</h4>
                <p>Electronic locks, access cards, biometric options, and audit trails</p>
              </div>
              <div className="tech-item">
                <h4>Integration Options</h4>
                <p>ERP systems, inventory software, billing platforms, and maintenance schedules</p>
              </div>
              <div className="tech-item">
                <h4>Reporting Dashboard</h4>
                <p>Real-time analytics, usage reports, cost tracking, and performance metrics</p>
              </div>
            </div>
          </div>

          <div className="product-cta">
            <h2>Take Control of Your Assets</h2>
            <p>
              Reduce loss, improve accountability, and streamline operations with our 
              comprehensive asset management locker solutions.
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

export default AssetManagement;
