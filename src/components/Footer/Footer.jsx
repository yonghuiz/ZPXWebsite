import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaAppStore, FaGooglePlay } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Markets',
      links: [
        { label: 'Apartments & Condos', href: '/markets/apartment' },
        { label: 'Office Buildings', href: '/markets/office' },
        { label: 'Asset Management', href: '/markets/asset-management' },
        { label: 'School Campus', href: '/markets/school' },
        { label: 'Food Service', href: '/markets/foodservice' },
        { label: 'eCommerce', href: '/markets/ecommerce' }
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'Package Lockers', href: '/products/package-locker' },
        { label: 'Refrigerated Lockers', href: '/products/refrigerated-locker' },
        { label: 'Asset Management', href: '/products/asset-management' },
        { label: 'Takeout Lockers', href: '/products/takeout-locker' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Gallery', href: '/gallery' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' }
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
              <img src="/Icon-512.png" alt="ZipcodeXpress logo" className="footer__logo-img" />
              
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
          <h4 className="footer__apps-title">Download Our App "ZipcodeXpress"</h4>
          <div className="footer__app-buttons">
            <a href="https://apps.apple.com/us/app/zipcodexpress/id1320712564" className="footer__app-button">
              <FaAppStore className="footer__app-icon" />
              <div className="footer__app-text">
                <span className="footer__app-subtitle">Download on the</span>
                <span className="footer__app-title">App Store</span>
              </div>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.zipcodexpress1&pcampaignid=web_share" className="footer__app-button">
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
            <a href="https://www.facebook.com/ZipcodeXpress/" className="footer__social-link" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/company/zipcodexpress/" className="footer__social-link" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/zipcodexpress/" className="footer__social-link" aria-label="Instagram">
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
