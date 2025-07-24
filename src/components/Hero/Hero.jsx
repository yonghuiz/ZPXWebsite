import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay, FaCheck } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const features = [
    '24/7 Secure Package Management',
    'QR Code & Mobile App Access',
    'Real-time Notifications',
    'Multiple Locker Sizes'
  ];

  const stats = [
    { number: '1000+', label: 'Satisfied Customers' },
    { number: '50K+', label: 'Packages Secured Daily' },
    { number: '99.9%', label: 'Uptime Reliability' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero__title">
              Smart Package Management
              <span className="gradient-text"> Solutions</span>
            </h1>
            <p className="hero__subtitle">
              Revolutionize package delivery with Zippora Smart Lockers. 
              Secure, convenient, and efficient package management for 
              apartments, offices, schools, and retail locations.
            </p>
            
            <ul className="hero__features">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="hero__feature"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <FaCheck className="hero__feature-icon" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="hero__cta">
              <a href="/register" className="btn btn-primary hero__cta-primary">
                Request Quote
                <FaArrowRight className="hero__cta-icon" />
              </a>
              <a href="#demo" className="btn btn-outline hero__cta-secondary">
                <FaPlay className="hero__cta-icon" />
                Watch Demo
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero__image-container">
              <img
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Smart Package Locker System"
                className="hero__image"
              />
              <div className="hero__floating-card hero__floating-card--1">
                <div className="hero__card-icon">📦</div>
                <div className="hero__card-content">
                  <h4>Package Delivered</h4>
                  <p>Access Code: #4729</p>
                </div>
              </div>
              <div className="hero__floating-card hero__floating-card--2">
                <div className="hero__card-icon">🔒</div>
                <div className="hero__card-content">
                  <h4>Secure Storage</h4>
                  <p>24/7 Monitoring</p>
                </div>
              </div>
              <div className="hero__floating-card hero__floating-card--3">
                <div className="hero__card-icon">📱</div>
                <div className="hero__card-content">
                  <h4>Mobile Access</h4>
                  <p>QR Code Scan</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="hero__stat">
              <div className="hero__stat-number">{stat.number}</div>
              <div className="hero__stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
