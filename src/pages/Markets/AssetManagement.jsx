import React from 'react';
import './AssetManagement.css';

const AssetManagement = () => {
  return (
    <div className="asset-management-page">
      {/* Hero Banner Section */}
      <section className="asset-banner">
        <div className="asset-banner-content">
          <h1 className="asset-banner-title">Asset Management & Tools Rental Locker</h1>
          <p className="asset-banner-subtitle">
            Smart inventory control and tool rental management solutions for modern businesses
          </p>
          <button className="asset-banner-btn">Learn More</button>
        </div>
      </section>

      {/* Current Problems Section */}
      <section className="asset-content-section">
        <div className="asset-content-container">
          <div className="asset-content-left">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic1%402x.png" 
              alt="Current Problems" 
              className="asset-content-image"
            />
          </div>
          <div className="asset-content-right">
            <h2 className="asset-content-title">Current Problems</h2>
            <div className="asset-content-text">
              <p>
                • Office staff, students are sharing tools, equipment or devices, but don't know the availability, and who is now possessing them, and when they can borrow. So tools and equipment can not be used efficiently, cost more money for companies or schools to buy more.
              </p>
              <br />
              <p>
                • Cost of labor to management the check-in and check-out of the tools and parts.
              </p>
              <br />
              <p>
                • No data of the utilization of the tools so to affect the budgeting to buy.
              </p>
              <br />
              <p>
                • Customers would like to rent tools when all stores are closed in the nights or holidays.
              </p>
              <br />
              <p>
                • Rental stores would like to generate more revenue yet don't want to pay extra labor fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Resolve Title */}
      <section className="asset-resolve-title">
        <h1>How do we resolve</h1>
      </section>

      {/* Solution Section 1 */}
      <section className="asset-content-section">
        <div className="asset-content-container">
          <div className="asset-content-left">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic2%402x.png" 
              alt="Free up staff" 
              className="asset-content-image"
            />
          </div>
          <div className="asset-content-right">
            <div className="asset-content-text">
              <p>
                Free up staff to for tools, parts and equipment management.
              </p>
              <br />
              <p>
                Be able to track all the tools and equipment usage, and the people who are using them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section 2 - Reversed Layout */}
      <section className="asset-content-section">
        <div className="asset-content-container asset-content-reverse">
          <div className="asset-content-left">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic3%402x.png" 
              alt="Data collection" 
              className="asset-content-image"
            />
          </div>
          <div className="asset-content-right">
            <div className="asset-content-text">
              <p>
                Collect all the data of the utilization, so to improve the efficiency and save the cost
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section 3 */}
      <section className="asset-content-section">
        <div className="asset-content-container">
          <div className="asset-content-left">
            <img 
              src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic4%402x.png" 
              alt="Easy tool rental" 
              className="asset-content-image"
            />
          </div>
          <div className="asset-content-right">
            <div className="asset-content-text">
              <p>
                Tools rental becomes so easy. Operate like a vending machine, customers only need to swipe their cards and pick up the tools you like.
              </p>
              <br />
              <p>
                All transactions are managed by our tool rental locker system, which you can oversee via our cloud management system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Suitable Places Section */}
      <section className="asset-suitable-places">
        <div className="asset-places-container">
          <h2 className="asset-places-title">Suitable Places</h2>
          <div className="asset-places-grid">
            <div className="asset-place-item">
              <img 
                src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/residential__icon.png" 
                alt="Residential Complex" 
                className="asset-place-icon"
              />
              <p className="asset-place-text">Residential Complex</p>
            </div>
            <div className="asset-place-item">
              <img 
                src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/school_icon.png" 
                alt="School/Business" 
                className="asset-place-icon"
              />
              <p className="asset-place-text">School/Business</p>
            </div>
            <div className="asset-place-item">
              <img 
                src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/hospital_icon.png" 
                alt="Hospital" 
                className="asset-place-icon"
              />
              <p className="asset-place-text">Hospital</p>
            </div>
            <div className="asset-place-item">
              <img 
                src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/home%20depot_icon.png" 
                alt="Home depot/Lowes" 
                className="asset-place-icon"
              />
              <p className="asset-place-text">Home depot/Lowes</p>
            </div>
            <div className="asset-place-item">
              <img 
                src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/tool%20rental_icon.png" 
                alt="Tools Rental/Asset Mgmt" 
                className="asset-place-icon"
              />
              <p className="asset-place-text">Tools Rental/Asset Mgmt</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetManagement;
