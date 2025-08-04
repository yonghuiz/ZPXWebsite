import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Markets',
      href: '#markets',
      dropdown: [
        { label: 'Apartment', href: '/markets/apartment' },
        { label: 'Office', href: '/markets/office' },
        { label: 'School', href: '/markets/school' },
        { label: 'Asset Management', href: '/markets/asset-management' },
        { label: 'Food Service', href: '/markets/food' },
        { label: 'eCommerce', href: '/markets/ecommerce' }
      ]
    },
    {
      label: 'Products',
      href: '#products',
      dropdown: [
        { label: 'Package Locker', href: '/products/package-locker' },
        { label: 'Take-out Locker', href: '/products/takeout-locker' },
        { label: 'Refrigerated Locker', href: '/products/refrigerated-locker' },
        { label: 'Asset Mgmt and Tools Rental Locker', href: '/products/asset-management' }
      ]
    },
    {
      label: 'About Us',
      href: '/about',
      dropdown: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' }
      ]
    }
  ];

  return (
    <motion.header 
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header__container">
        <div className="header__brand">
          <Link to="/" className="header__logo">
            <img src="/zicodexpress _green.png" alt="ZipcodeXpress" className="header__logo-img" />
            <span className="header__logo-slogan">Package Locker Expert</span>
          </Link>
        </div>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className={`header__nav-item ${item.dropdown ? 'header__nav-item--dropdown' : ''}`}
                onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href.startsWith('/') ? (
                  <Link
                    to={item.href}
                    className="header__nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {item.dropdown && <FaChevronDown className="header__nav-arrow" />}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="header__nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {item.dropdown && <FaChevronDown className="header__nav-arrow" />}
                  </a>
                )}
                {item.dropdown && (
                  <div className={`header__dropdown ${activeDropdown === index ? 'header__dropdown--active' : ''}`}>
                    <ul className="header__dropdown-list">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <li key={dropdownIndex} className="header__dropdown-item">
                          <Link
                            to={dropdownItem.href}
                            className="header__dropdown-link"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          {/* Mobile contact info and actions */}
          <div className="header__contact">
            <a href="tel:18008839662" className="header__contact-link">
              <FaPhone className="header__contact-icon" />
              <span className="header__contact-text">1.800.883.9662</span>
            </a>
          </div>
          
          <div className="header__cta">
            <a 
              href="https://account.zipcodexpress.com/" 
              className="btn btn-outline header__login"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </a>
            <Link 
              to="/register" 
              className="btn btn-primary header__quote"
              onClick={() => setIsMenuOpen(false)}
            >
              Request Quote
            </Link>
          </div>
        </nav>

        <div className="header__actions">
          <div className="header__contact">
            <a href="tel:18008839662" className="header__contact-link">
              <FaPhone className="header__contact-icon" />
              <span className="header__contact-text">1.800.883.9662</span>
            </a>
          </div>
          <div className="header__cta">
            <a href="https://account.zipcodexpress.com/" className="btn btn-outline header__login">
              Login
            </a>
            <Link to="/register" className="btn btn-primary header__quote">
              Request Quote
            </Link>
          </div>
        </div>

        <button
          className="header__mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
