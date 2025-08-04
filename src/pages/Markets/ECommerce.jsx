import React from 'react';
import { Link } from 'react-router-dom';
import './MarketPage.css';

const ECommerce = () => {
  return (
    <div className="market-page ecommerce-page">
      {/* Hero Banner Section */}
      <section className="ecommerce-banner0">
        <div className="ecommerce-banner0-text-wrapper">
          <h1 className="ecommerce-banner0-title">eCommerce Solutions</h1>
          <p className="ecommerce-banner0-content">for Smart Shopping</p>
          <button className="banner0-button">Learn More</button>
        </div>
      </section>

      {/* Current Problems Section */}
      <section className="ecommerce-content1-wrapper">
        <div className="container ecommerce-content1">
          <div className="ecommerce-content1-img">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/ECOMMERCE_slices/pic_1%402x.png" 
              alt="Shopping problems" 
            />
          </div>
          <div className="ecommerce-content1-text">
            <h2 className="ecommerce-content1-title">Current Problems</h2>
            <div className="ecommerce-content1-content">
              <p>
                Customers feel they spend too much time in the store to look for something, 
                looking for more convenient and time-saving way to get what they need?
              </p>
              <p>
                With our smart locker solution, you can put our smart locker outside or inside your store, 
                customer can just stop by on their way to home or office, and pick up their orders online right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Solutions Section */}
      <section className="ecommerce-content2-wrapper">
        <div className="container ecommerce-content2">
          <div className="ecommerce-content2-text">
            <h2 className="ecommerce-content2-title">Advanced Features</h2>
            <div className="ecommerce-content2-content">
              <p>
                And we also can work with grocery stores to deliver the product to customers' nearest lockers 
                in their zipcode so that customers don't need to come to the store, making them even more convenient 
                and more importantly with very low cost for both grocery stores and customers.
              </p>
              <p>
                We also provide lockers with cooling and thermal-control features to keep customer orders fresh 
                even when they can't be on time to pick up.
              </p>
            </div>
          </div>
          <div className="ecommerce-content2-img">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/ECOMMERCE_slices/pic_4%402x.png" 
              alt="Cooling and thermal control" 
            />
          </div>
        </div>
      </section>

      {/* Solution Banner Section */}
      <section className="ecommerce-banner4">
        <div className="container ecommerce-banner4-page">
          <div className="ecommerce-banner4-title-wrapper">
            <h2 className="ecommerce-banner4-title">How do we resolve</h2>
            <div className="ecommerce-banner4-content">
              <p>
                Packages are dropped off in designated lockers. Customers don't have to wait at home anymore. 
                Customers are notified upon their packages' arrival. Customers pick up their packages 24/7.
              </p>
            </div>
          </div>
          <div className="ecommerce-banner4-image">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/apartment/pic2_apartment.png" 
              alt="Smart locker solution" 
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="ecommerce-feature7-wrapper">
        <div className="container">
          <div className="ecommerce-feature7-title-wrapper">
            <h2 className="ecommerce-feature7-title">Transform Your Shopping Experience</h2>
          </div>
          <div className="ecommerce-feature7-block-wrapper">
            <div className="ecommerce-feature7-block">
              <div className="ecommerce-feature7-block-group">
                <div className="ecommerce-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/acfe55401bfc35949aaa9b49ac9b3fb6ec4a1df7.png" 
                    alt="Convenient pickup" 
                  />
                </div>
                <p className="ecommerce-feature7-block-content">
                  Pick up your orders anytime, anywhere with 24/7 access to smart lockers
                </p>
              </div>
            </div>
            
            <div className="ecommerce-feature7-block">
              <div className="ecommerce-feature7-block-group">
                <div className="ecommerce-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/d0af21351103c9d30cb1cae9e2df29d7d1991761.png" 
                    alt="Secure storage" 
                  />
                </div>
                <p className="ecommerce-feature7-block-content">
                  Secure storage for your valuable purchases with temperature control options
                </p>
              </div>
            </div>
            
            <div className="ecommerce-feature7-block">
              <div className="ecommerce-feature7-block-group">
                <div className="ecommerce-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/744ddaeba3f8316af168b5c10e3069fb6d894165.png" 
                    alt="Contactless delivery" 
                  />
                </div>
                <p className="ecommerce-feature7-block-content">
                  Contactless delivery and pickup for a safe shopping experience
                </p>
              </div>
            </div>
            
            <div className="ecommerce-feature7-block">
              <div className="ecommerce-feature7-block-group">
                <div className="ecommerce-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/25c4525e929c8e49c23bc982f4d3d7bcea94999c.png" 
                    alt="Time saving" 
                  />
                </div>
                <p className="ecommerce-feature7-block-content">
                  Save time with instant notifications and flexible pickup schedules
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ecommerce-cta-section">
        <div className="container">
          <div className="ecommerce-cta-content">
            <h2>Ready to Revolutionize Your eCommerce Experience?</h2>
            <p>Contact us today to learn more about our smart locker solutions for retail and eCommerce.</p>
            <div className="ecommerce-cta-buttons">
              <Link to="/register" className="btn btn-primary">Request Quote</Link>
              <a href="/contact-us" className="btn btn-outline">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ECommerce;
