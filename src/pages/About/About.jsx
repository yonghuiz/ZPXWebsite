import React from 'react';
import './AboutPage.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__container">
          <h1 className="about-hero__title">About ZipcodeXpress</h1>
          <p className="about-hero__subtitle">
            Revolutionizing package delivery with smart locker solutions
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-content__container">
          <div className="about-overview">
            <h2>Our Mission</h2>
            <p>
              ZipcodeXpress is dedicated to solving the last-mile delivery challenge
              through innovative package locker solutions. We provide secure, convenient,
              and efficient delivery systems for apartments, offices, schools, and retail locations.
            </p>
          </div>

          <div className="about-story">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                ZipcodeXpress Inc., based in Austin, TX, specializes in total smart-locker solution with cutting edge intelligent smart-locker products and cloud-based software system. We are the technology owner and manufacturer of the state-of-the-art smart locker system.
              </p>
              <p>
                And our smart locker system is fully customizable both in software and hardware to fulfill your needs.
              </p>
              <p>
                We strive to make the “last mile delivery” more convenient for property managers, residents, school faculties and vast students. Our goal is to provide our customers with faster, more secure and lower cost logistics service to make everybody’s life easier with great happiness.
              </p>
            </div>
          </div>

          <div className="about-values">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Innovation</h3>
                <p>
                  We continuously evolve our technology to meet the changing needs
                  of modern package delivery and management.
                </p>
              </div>
              <div className="value-card">
                <h3>Security</h3>
                <p>
                  Every solution we provide prioritizes the security and safety
                  of packages and personal information.
                </p>
              </div>
              <div className="value-card">
                <h3>Reliability</h3>
                <p>
                  Our systems are built for 24/7 operation with minimal downtime
                  and maximum efficiency.
                </p>
              </div>
              <div className="value-card">
                <h3>Customer Focus</h3>
                <p>
                  We design every solution with the end user in mind, ensuring
                  ease of use and satisfaction.
                </p>
              </div>
            </div>
          </div>

          <div className="about-team">
            <h2>Leadership Team</h2>
            <p>
              Our experienced leadership team brings together decades of experience
              in logistics, technology, and business operations to drive innovation
              in the package delivery industry.
            </p>
            <div className="team-grid">
              <div className="team-member">
                <h4>Chief Executive Officer</h4>
                <p>Leading strategic vision and company growth</p>
              </div>
              <div className="team-member">
                <h4>Chief Technology Officer</h4>
                <p>Driving innovation in smart locker technology</p>
              </div>
              <div className="team-member">
                <h4>VP of Operations</h4>
                <p>Ensuring seamless deployment and service delivery</p>
              </div>
              <div className="team-member">
                <h4>VP of Sales</h4>
                <p>Building partnerships and expanding market reach</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
