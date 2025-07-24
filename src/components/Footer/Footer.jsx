import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaAppStore, FaGooglePlay } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { label: 'Apartments & Condos', href: '#apartment' },
        { label: 'Office Buildings', href: '#office' },
        { label: 'School Campus', href: '#school' },
        { label: 'Grocery Stores', href: '#grocery' },
        { label: 'Food Service', href: '#foodservice' }
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'Package Lockers', href: '#package-lockers' },
        { label: 'Refrigerated Lockers', href: '#refrigerated' },
        { label: 'Asset Management', href: '#asset-management' },
        { label: 'Takeout Lockers', href: '#takeout' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Leadership', href: '#leadership' },
        { label: 'Contact Us', href: '#contact' },
        { label: 'Partnership', href: '#partnership' },
        { label: 'FAQ', href: '#faq' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'User Login', href: '#login' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Request Quote', href: '/register' }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/logo.svg" alt="ZipcodeXpress" className="footer__logo-img" />
              <span className="footer__logo-text">ZipcodeXpress</span>
            </div>
            <p className="footer__description">
              Leading provider of smart package locker solutions for apartments, 
              offices, schools, and retail locations. Secure, convenient, and efficient.
            </p>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <FaPhone className="footer__contact-icon" />
                <span>1.800.883.9662</span>
              </div>
              <div className="footer__contact-item">
                <FaEnvelope className="footer__contact-icon" />
                <span>info@zipcodexpress.com</span>
              </div>
              <div className="footer__contact-item">
                <FaMapMarkerAlt className="footer__contact-icon" />
                <span>Package Locker & Logistics Expert</span>
              </div>
            </div>
          </div>

          <div className="footer__sections">
            {footerSections.map((section, index) => (
              <div key={index} className="footer__section">
                <h4 className="footer__section-title">{section.title}</h4>
                <ul className="footer__section-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="footer__section-link">
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__apps">
          <h4 className="footer__apps-title">Download Our App</h4>
          <div className="footer__app-buttons">
            <a href="#ios-app" className="footer__app-button">
              <FaAppStore className="footer__app-icon" />
              <div className="footer__app-text">
                <span className="footer__app-subtitle">Download on the</span>
                <span className="footer__app-title">App Store</span>
              </div>
            </a>
            <a href="#android-app" className="footer__app-button">
              <FaGooglePlay className="footer__app-icon" />
              <div className="footer__app-text">
                <span className="footer__app-subtitle">Get it on</span>
                <span className="footer__app-title">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__social">
            <a href="#facebook" className="footer__social-link" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#twitter" className="footer__social-link" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#linkedin" className="footer__social-link" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#instagram" className="footer__social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
          <div className="footer__copyright">
            <p>&copy; {currentYear} ZipcodeXpress Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
