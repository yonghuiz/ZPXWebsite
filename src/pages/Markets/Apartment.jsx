import React from 'react';
import './MarketPage.css';

const Apartment = () => {
  return (
    <div className="market-page apartment-page">
      {/* Hero Banner Section with reference background */}
      <section className="apt-banner0">
        <div className="apt-banner0-text-wrapper">
          <h1 className="apt-banner0-title">Package Management Solutions</h1>
          <p className="apt-banner0-content">for Apartments</p>
          <button className="banner0-button">Learn More</button>
        </div>
      </section>

      {/* Current Problems Section */}
      <section className="apt-content1-wrapper">
        <div className="container apt-content1">
          <div className="apt-content1-img">
            <img 
              src="https://bucket.mlcdn.com/a/1736/1736632/images/cda2457e21ae0a03934d92d78bfde63eb7fd55a1.png" 
              alt="Package delivery problems" 
            />
          </div>
          <div className="apt-content1-text">
            <h2 className="apt-content1-title">Current Problems</h2>
            <div className="apt-content1-content">
              <p>
                AS A RESIDENT, have you ever missed out on special events waiting for your package because it's never delivered on time? 
                Have you ever run to management office after work to retrieve your package yet it's already closed? 
                Have you ever lost your packages because carrier carelessly left them at your door front?
              </p>
              <p>
                AS A PROPERTY MANAGER, are you tired of constantly signing packages for your tenants? 
                Are you done with tenants complaining about their lost packages? 
                Are you not happy about packages pile up in your storage room?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Banner Section */}
      <section className="apt-banner4">
        <div className="container apt-banner4-page">
          <div className="apt-banner4-title-wrapper">
            <h2 className="apt-banner4-title">How do we resolve</h2>
            <div className="apt-banner4-content">
              <p>
                Packages are dropped off in designated lockers. Residents don't have to wait at home anymore. 
                Residents are notified upon their packages' arrival. Residents pick up their packages 24/7.
              </p>
            </div>
          </div>
          <div className="apt-banner4-image">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/apartment/pic2_apartment.png" 
              alt="Smart locker solution" 
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="apt-feature7-wrapper">
        <div className="container">
          <div className="apt-feature7-title-wrapper">
            <h2 className="apt-feature7-title">You can take easy now</h2>
          </div>
          <div className="apt-feature7-block-wrapper">
            <div className="apt-feature7-block">
              <div className="apt-feature7-block-group">
                <div className="apt-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/acfe55401bfc35949aaa9b49ac9b3fb6ec4a1df7.png" 
                    alt="No multiple delivery attempts" 
                  />
                </div>
                <p className="apt-feature7-block-content">
                  No more multiple attempts to deliver bulky packages to each unit
                </p>
              </div>
            </div>
            
            <div className="apt-feature7-block">
              <div className="apt-feature7-block-group">
                <div className="apt-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/d0af21351103c9d30cb1cae9e2df29d7d1991761.png" 
                    alt="Secure package delivery" 
                  />
                </div>
                <p className="apt-feature7-block-content">
                  No more leaving valuable packages at door front that may cause liability issues
                </p>
              </div>
            </div>
            
            <div className="apt-feature7-block">
              <div className="apt-feature7-block-group">
                <div className="apt-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/744ddaeba3f8316af168b5c10e3069fb6d894165.png" 
                    alt="No signature required" 
                  />
                </div>
                <p className="apt-feature7-block-content">
                  No more requesting signatures by property management
                </p>
              </div>
            </div>
            
            <div className="apt-feature7-block">
              <div className="apt-feature7-block-group">
                <div className="apt-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/25c4525e929c8e49c23bc982f4d3d7bcea94999c.png" 
                    alt="Time saving" 
                  />
                </div>
                <p className="apt-feature7-block-content">
                  No more climbing stairs and time wasted
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="apt-cta-section">
        <div className="container">
          <div className="apt-cta-content">
            <h2>Ready to Transform Your Package Management?</h2>
            <p>Contact us today to learn more about our smart locker solutions for apartments.</p>
            <div className="apt-cta-buttons">
              <a href="/register" className="btn btn-primary">Request Quote</a>
              <a href="/contact-us" className="btn btn-outline">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apartment;
