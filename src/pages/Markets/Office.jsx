import React from 'react';
import { Link } from 'react-router-dom';
import './MarketPage.css';

const Office = () => {
  return (
    <div className="market-page office-page">
      {/* Hero Banner Section with reference background */}
      <section className="office-banner0">
        <div className="office-banner0-text-wrapper">
          <h1 className="office-banner0-title">Package Management Solutions</h1>
          <p className="office-banner0-content">for Offices</p>
          <button className="banner0-button">Learn More</button>
        </div>
      </section>

      {/* Current Problems Section */}
      <section className="office-content1-wrapper">
        <div className="container office-content1">
          <div className="office-content1-img">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/FOR%20OFFICE_slices/pic_office.png" 
              alt="Office package delivery problems" 
            />
          </div>
          <div className="office-content1-text">
            <h2 className="office-content1-title">Current Problems</h2>
            <div className="office-content1-content">
              <p>
                AS AN EMPLOYEE, are you ever in the situation that personal deliveries keep bothering you during your work time? 
                Do you experience the uncomfortable feeling on the way back to home carrying all the packages? 
                Have you ever embarrassed receiving large packages at your office?
              </p>
              <p>
                AS A BUILDING MANAGER, is your receptionist overwhelmed by packages but she still has many other responsibilities to serve? 
                Do you run out of space to store all the packages deliveries for your building tenants? 
                Are you tired of complaints about packages delays and been lost?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Banner Section */}
      <section className="office-banner4">
        <div className="container office-banner4-page">
          <div className="office-banner4-title-wrapper">
            <h2 className="office-banner4-title">How do we resolve</h2>
            <div className="office-banner4-content">
              <p>
                Packages are delivered directly to smart lockers in office buildings. 
                Employees receive instant notifications and can pick up packages at their convenience. 
                Reception staff are freed from package management duties to focus on their primary responsibilities.
              </p>
            </div>
          </div>
          <div className="office-banner4-image">
            <img 
              src="/images/slide1.jpg" 
              alt="Smart office locker solution" 
            />
          </div>
        </div>
      </section>

      {/* Office Image Section */}
      <section className="office-image-section">
        <div className="container">
          <img 
            src="/images/pic2_school-2.png" 
            alt="Office Smart Lockers" 
            className="office-feature-image"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="office-feature7-wrapper">
        <div className="container">
          <div className="office-feature7-title-wrapper">
            <h2 className="office-feature7-title">Professional workplace efficiency</h2>
          </div>
          <div className="office-feature7-block-wrapper">
            <div className="office-feature7-block">
              <div className="office-feature7-block-group">
                <div className="office-feature7-block-image">
                  <div className="solution-icon">⚡</div>
                </div>
                <p className="office-feature7-block-content">
                  Fast pickup without reception interruption
                </p>
              </div>
            </div>
            
            <div className="office-feature7-block">
              <div className="office-feature7-block-group">
                <div className="office-feature7-block-image">
                  <div className="solution-icon">📦</div>
                </div>
                <p className="office-feature7-block-content">
                  Secure package storage for professional environments
                </p>
              </div>
            </div>
            
            <div className="office-feature7-block">
              <div className="office-feature7-block-group">
                <div className="office-feature7-block-image">
                  <div className="solution-icon">🕒</div>
                </div>
                <p className="office-feature7-block-content">
                  24/7 availability for busy work schedules
                </p>
              </div>
            </div>
            
            <div className="office-feature7-block">
              <div className="office-feature7-block-group">
                <div className="office-feature7-block-image">
                  <div className="solution-icon">📱</div>
                </div>
                <p className="office-feature7-block-content">
                  Real-time notifications for immediate pickup
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="office-cta-section">
        <div className="container">
          <div className="office-cta-content">
            <h2>Ready to Streamline Your Office Package Management?</h2>
            <p>Contact us today to learn more about our smart locker solutions for office buildings.</p>
            <div className="office-cta-buttons">
              <Link to="/register" className="btn btn-primary">Request Quote</Link>
              <a href="/contact-us" className="btn btn-outline">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Office;
