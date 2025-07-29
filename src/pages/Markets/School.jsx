import React from 'react';
import './MarketPage.css';

const School = () => {
  return (
    <div className="market-page school-page">
      {/* Hero Banner Section with reference background */}
      <section className="school-banner0">
        <div className="school-banner0-text-wrapper">
          <h1 className="school-banner0-title">Package Management Solutions</h1>
          <p className="school-banner0-content">for Schools</p>
          <button className="banner0-button">Learn More</button>
        </div>
      </section>

      {/* Current Problems Section */}
      <section className="school-content1-wrapper">
        <div className="container school-content1">
          <div className="school-content1-img">
            <img 
              src="https://bucket.mlcdn.com/a/1736/1736632/images/d59fa3e64ac9c8aff4645140b4eaf7d53c074c96.png" 
              alt="School package delivery problems" 
            />
          </div>
          <div className="school-content1-text">
            <h2 className="school-content1-title">Current Problems</h2>
            <div className="school-content1-content">
              <p>
                AS A STUDENT, are you ever stuck in situation that your books and essentials have been delivered to the front desk; 
                and you couldn't pick them up since you still have class until late night? 
                Do you find it inconvenient to head to front desk from the opposite side of the campus?
              </p>
              <p>
                AS AN EMPLOYEE, are you tired of sorting and tracking packages for students? 
                Are you tired of students bothering you about their late packages in the middle of your other duties? 
                Do you experience package pile up in mailroom and never find the package students are inquiring?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Banner Section */}
      <section className="school-banner4">
        <div className="container school-banner4-page">
          <div className="school-banner4-title-wrapper">
            <h2 className="school-banner4-title">How do we resolve</h2>
            <div className="school-banner4-content">
              <p>
                Smart lockers are strategically placed across campus for easy student access. 
                Students receive instant notifications when packages arrive and can pick them up anytime. 
                Campus staff are freed from package management to focus on educational support.
              </p>
            </div>
          </div>
          <div className="school-banner4-image">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/school_slices/pic2_school%402x.png" 
              alt="Smart campus locker solution" 
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="school-feature7-wrapper">
        <div className="container">
          <div className="school-feature7-title-wrapper">
            <h2 className="school-feature7-title">Enhanced campus experience</h2>
          </div>
          <div className="school-feature7-block-wrapper">
            <div className="school-feature7-block">
              <div className="school-feature7-block-group">
                <div className="school-feature7-block-image">
                  <div className="solution-icon">⚡</div>
                </div>
                <p className="school-feature7-block-content">
                  Faster student experience with immediate access
                </p>
              </div>
            </div>
            
            <div className="school-feature7-block">
              <div className="school-feature7-block-group">
                <div className="school-feature7-block-image">
                  <div className="solution-icon">👨‍💼</div>
                </div>
                <p className="school-feature7-block-content">
                  Reduced employee workload and administrative burden
                </p>
              </div>
            </div>
            
            <div className="school-feature7-block">
              <div className="school-feature7-block-group">
                <div className="school-feature7-block-image">
                  <div className="solution-icon">🔒</div>
                </div>
                <p className="school-feature7-block-content">
                  Secure automated storage for valuable items
                </p>
              </div>
            </div>
            
            <div className="school-feature7-block">
              <div className="school-feature7-block-group">
                <div className="school-feature7-block-image">
                  <div className="solution-icon">🏫</div>
                </div>
                <p className="school-feature7-block-content">
                  Available 24/7 for campus convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="school-cta-section">
        <div className="container">
          <div className="school-cta-content">
            <h2>Ready to Modernize Your Campus Package Management?</h2>
            <p>Contact us today to learn more about our smart locker solutions for educational institutions.</p>
            <div className="school-cta-buttons">
              <a href="/register" className="btn btn-primary">Request Quote</a>
              <a href="/contact-us" className="btn btn-outline">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default School;
