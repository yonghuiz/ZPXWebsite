import React from 'react';
import { Link } from 'react-router-dom';
import './MarketPage.css';

const Food = () => {
  return (
    <div className="market-page food-page">
      {/* Hero Banner Section */}
      <section className="food-banner0">
        <div className="food-banner0-text-wrapper">
          <h1 className="food-banner0-title">Food Service Solutions</h1>
          <p className="food-banner0-content">for Smart Delivery</p>
          <button className="banner0-button">Learn More</button>
        </div>
      </section>

      {/* Current Problems Section */}
      <section className="food-content1-wrapper">
        <div className="container food-content1">
          <div className="food-content1-img">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/Food%20Service_slices/pic1%402x.png" 
              alt="Food delivery problems" 
            />
          </div>
          <div className="food-content1-text">
            <h2 className="food-content1-title">Current Problems</h2>
            <div className="food-content1-content">
              <p>
                Have you experienced that due to a long meeting, you have to call for a food delivery, 
                yet you can't go out to fetch food but worry that the food will get cold?
              </p>
              <p>
                Or you called for food delivery, due to bad traffic, can't make it home on time?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Banner Section */}
      <section className="food-banner4">
        <div className="container food-banner4-page">
          <div className="food-banner4-content-wrapper">
            <h2 className="food-banner4-title">How do we resolve</h2>
            <div className="food-banner4-content">
              <p>
                Food from now on can be easily delivered to your locker. You can fetch it right after class. 
                Now school faculty can take their hands out to handle things more important. No more hiring required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Food Images */}
      <section className="food-images-section">
        <div className="container">
          <div className="food-images-wrapper">
            <img 
              src="/src/assets/food_pic2@2x.png" 
              alt="Food service solution" 
              className="food-additional-image"
            />
            <img 
              src="/src/assets/food_pic3@2x.png" 
              alt="Smart locker food delivery" 
              className="food-additional-image"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="food-feature7-wrapper">
        <div className="container">
          <div className="food-feature7-title-wrapper">
            <h2 className="food-feature7-title">Benefits of Our Food Service Solution</h2>
          </div>
          <div className="food-feature7-block-wrapper">
            <div className="food-feature7-block">
              <div className="food-feature7-block-group">
                <div className="food-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/acfe55401bfc35949aaa9b49ac9b3fb6ec4a1df7.png" 
                    alt="No multiple delivery attempts" 
                  />
                </div>
                <p className="food-feature7-block-content">
                  No more multiple attempts to deliver bulky packages to each unit
                </p>
              </div>
            </div>
            
            <div className="food-feature7-block">
              <div className="food-feature7-block-group">
                <div className="food-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/d0af21351103c9d30cb1cae9e2df29d7d1991761.png" 
                    alt="Secure food delivery" 
                  />
                </div>
                <p className="food-feature7-block-content">
                  No more leaving valuable packages at door front that may cause liability issues
                </p>
              </div>
            </div>
            
            <div className="food-feature7-block">
              <div className="food-feature7-block-group">
                <div className="food-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/744ddaeba3f8316af168b5c10e3069fb6d894165.png" 
                    alt="No signature required" 
                  />
                </div>
                <p className="food-feature7-block-content">
                  No more requesting signatures by property management
                </p>
              </div>
            </div>
            
            <div className="food-feature7-block">
              <div className="food-feature7-block-group">
                <div className="food-feature7-block-image">
                  <img 
                    src="https://bucket.mlcdn.com/a/1736/1736632/images/25c4525e929c8e49c23bc982f4d3d7bcea94999c.png" 
                    alt="Time saving" 
                  />
                </div>
                <p className="food-feature7-block-content">
                  No more climbing stairs and time wasted
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="food-cta-section">
        <div className="container">
          <div className="food-cta-content">
            <h2>Ready to Transform Your Food Delivery Experience?</h2>
            <p>Contact us today to learn more about our smart locker solutions for food services.</p>
            <div className="food-cta-buttons">
              <Link to="/register" className="btn btn-primary">Request Quote</Link>
              <a href="/contact-us" className="btn btn-outline">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Food;
