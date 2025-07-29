import React from 'react';
import './MarketPage.css';

const AssetManagement = () => {
  return (
    <div className="market-page asset-page">
      {/* Hero Banner Section with reference background */}
      <section className="asset-banner0">
        <div className="asset-banner0-text-wrapper">
          <h1 className="asset-banner0-title">Package Management Solutions</h1>
          <p className="asset-banner0-content">for Asset Management</p>
          <button className="banner0-button">Learn More</button>
        </div>
      </section>

      {/* Current Problems Section */}
      <section className="asset-content1-wrapper">
        <div className="container asset-content1">
          <div className="asset-content1-img">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic1%402x.png" 
              alt="Asset management package delivery problems" 
            />
          </div>
          <div className="asset-content1-text">
            <h2 className="asset-content1-title">Current Problems</h2>
            <div className="asset-content1-content">
              <p>
                AS A TENANT, do you find it difficult to be reached all the time in case packages that show delivery confirmation yet you never receive them? 
                Do you ever miss the delivery time because you are at work? 
                Do you feel it's unsafe to leave packages at the door front?
              </p>
              <p>
                AS A PROPERTY MANAGER, do you constantly receive phone calls or visit inquiries from tenants complaining about their missing packages? 
                Do you constantly spend time on sorting and tracking packages that interrupt your other duties? 
                Are you questioned about apartment liability on lost packages?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Banner Section */}
      <section className="asset-banner4">
        <div className="container asset-banner4-page">
          <div className="asset-banner4-title-wrapper">
            <h2 className="asset-banner4-title">How do we resolve</h2>
            <div className="asset-banner4-content">
              <p>
                Professional-grade smart lockers provide secure package storage for multi-unit properties. 
                Tenants receive instant notifications and can access packages anytime. 
                Property managers reduce liability and administrative burden while improving tenant satisfaction.
              </p>
            </div>
          </div>
          <div className="asset-banner4-image">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/apartment/pic2_apartment.png" 
              alt="Smart property management locker solution" 
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="asset-feature7-wrapper">
        <div className="container">
          <div className="asset-feature7-title-wrapper">
            <h2 className="asset-feature7-title">Professional property management</h2>
          </div>
          <div className="asset-feature7-block-wrapper">
            <div className="asset-feature7-block">
              <div className="asset-feature7-block-group">
                <div className="asset-feature7-block-image">
                  <div className="solution-icon">🏢</div>
                </div>
                <p className="asset-feature7-block-content">
                  Professional property management solutions
                </p>
              </div>
            </div>
            
            <div className="asset-feature7-block">
              <div className="asset-feature7-block-group">
                <div className="asset-feature7-block-image">
                  <div className="solution-icon">🔒</div>
                </div>
                <p className="asset-feature7-block-content">
                  Secure package storage with liability protection
                </p>
              </div>
            </div>
            
            <div className="asset-feature7-block">
              <div className="asset-feature7-block-group">
                <div className="asset-feature7-block-image">
                  <div className="solution-icon">📋</div>
                </div>
                <p className="asset-feature7-block-content">
                  Automated tracking and management systems
                </p>
              </div>
            </div>
            
            <div className="asset-feature7-block">
              <div className="asset-feature7-block-group">
                <div className="asset-feature7-block-image">
                  <div className="solution-icon">👥</div>
                </div>
                <p className="asset-feature7-block-content">
                  Improved tenant satisfaction and retention
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="asset-cta-section">
        <div className="container">
          <div className="asset-cta-content">
            <h2>Ready to Enhance Your Property Management?</h2>
            <p>Contact us today to learn more about our smart locker solutions for asset management companies.</p>
            <div className="asset-cta-buttons">
              <a href="/register" className="btn btn-primary">Request Quote</a>
              <a href="/contact-us" className="btn btn-outline">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetManagement;
