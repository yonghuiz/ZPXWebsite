import React from 'react';
import './MarketPage.css';

const GroceryStore = () => {
  return (
    <div className="market-page">
      {/* Hero Section with Background Image */}
      <section className="market-hero grocery-hero">
        <div className="hero-overlay"></div>
        <div className="market-hero__container">
          <div className="market-hero__content">
            <div className="hero-badge">— PACKAGE LOCKER EXPERT —</div>
            <h1 className="market-hero__title">GROCERY STORE</h1>
          </div>
        </div>
      </section>

      <section className="market-content">
        <div className="market-content__container">
          
          {/* Current Problems Section */}
          <div className="problems-section">
            <h2>Current Problems</h2>
            
            <div className="problem-item">
              <h3>AS A CUSTOMER</h3>
              <p>Do you find it inconvenient that you order groceries online yet you still have to stay home the whole day waiting for groceries to be delivered? Are you frustrated by the unpredictable delivery time? Do you ever feel angry that the delivery person calls you when you are in the middle of urgent situations yet they can't wait?</p>
            </div>

            <div className="problem-item">
              <h3>AS A GROCERY STORE MANAGER</h3>
              <p>Do you experience challenges delivering groceries to customer doors and ensure the customer are home to receive them? Are you tired of customer complaints about late, damaged, or lost groceries? Do you feel it challenging to manage delivery route efficiently during your peak time?</p>
            </div>
          </div>

          {/* Solution Image */}
          <div className="solution-image-container">
            <img 
              src="https://www.zipcodexpress.com/wp-content/uploads/2017/05/slove_pic@2x-768x117.png" 
              alt="Solution Overview"
              className="solution-image"
            />
          </div>

          {/* How Do We Resolve Section */}
          <div className="solution-section">
            <h2>How Do We Resolve</h2>
            
            <div className="solution-grid">
              <div className="solution-item">
                <div className="solution-icon">🛒</div>
                <p>Convenient grocery pickup solutions</p>
              </div>
              
              <div className="solution-item">
                <div className="solution-icon">❄️</div>
                <p>Temperature-controlled storage options</p>
              </div>
              
              <div className="solution-item">
                <div className="solution-icon">⏰</div>
                <p>Flexible pickup scheduling</p>
              </div>
              
              <div className="solution-item">
                <div className="solution-icon">📱</div>
                <p>Real-time delivery notifications</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="market-cta">
            <div className="cta-buttons">
              <a href="/register" className="btn btn-primary">Request Quote</a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default GroceryStore;
