import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaMobile, 
  FaQrcode, 
  FaIdCard, 
  FaKey, 
  FaBoxes, 
  FaVideo, 
  FaShieldAlt, 
  FaBell,
  FaChartLine,
  FaClock
} from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const mainFeatures = [
    {
      icon: FaMobile,
      title: 'Mobile App Access',
      description: 'Android and iOS apps with user-friendly interface. Property managers can post notifications and ads.',
      highlights: ['Cross-platform compatibility', 'Real-time notifications', 'Admin portal access']
    },
    {
      icon: FaQrcode,
      title: 'QR Code Scanner',
      description: 'First and only package locker company to provide QR code scanning. Simply scan to retrieve packages.',
      highlights: ['Instant package retrieval', 'No code memorization', 'Contactless access']
    },
    {
      icon: FaIdCard,
      title: 'IC Card Reader',
      description: 'Property managers can scan IC cards to access locker management system with admin controls.',
      highlights: ['Secure admin access', 'Easy locker management', 'Multiple authentication methods']
    },
    {
      icon: FaKey,
      title: 'Access Code Login',
      description: 'Multiple delivery methods: email, SMS, and mobile app. No notification delays guaranteed.',
      highlights: ['Triple notification system', 'Instant delivery', 'Backup access methods']
    }
  ];

  const additionalFeatures = [
    {
      icon: FaBoxes,
      title: 'Various Locker Sizes',
      description: '6 different sizes (S, M, L, XL, XXL, Oversize) with expandable add-on units.',
      color: 'var(--primary-blue)'
    },
    {
      icon: FaVideo,
      title: 'Video Surveillance',
      description: '24/7 HD security cameras with audio, 48-hour playback, and live mobile monitoring.',
      color: 'var(--success-color)'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Storage',
      description: 'Bank-level security with multiple access controls and monitoring systems.',
      color: 'var(--warning-color)'
    },
    {
      icon: FaBell,
      title: 'Real-time Alerts',
      description: 'Instant notifications for deliveries, pickups, and system status updates.',
      color: 'var(--error-color)'
    },
    {
      icon: FaChartLine,
      title: 'Analytics Dashboard',
      description: 'Comprehensive reporting on usage patterns, delivery times, and system performance.',
      color: 'var(--primary-blue-light)'
    },
    {
      icon: FaClock,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and monitoring for uninterrupted service.',
      color: 'var(--secondary-gray-dark)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="features">
      <div className="features__container">
        <motion.div
          className="features__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="features__title">
            Zippora Smart Technologies
          </h2>
          <p className="features__subtitle">
            We continuously develop the best technologies for our clients. 
            Your convenience and satisfaction is our goal.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          className="features__main-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="features__main-card"
              variants={itemVariants}
            >
              <div className="features__main-icon">
                <feature.icon />
              </div>
              <div className="features__main-content">
                <h3 className="features__main-title">{feature.title}</h3>
                <p className="features__main-description">{feature.description}</p>
                <ul className="features__main-highlights">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="features__main-highlight">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          className="features__additional"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="features__additional-title">Complete Package Management Solution</h3>
          <div className="features__additional-grid">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="features__additional-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="features__additional-icon"
                  style={{ color: feature.color }}
                >
                  <feature.icon />
                </div>
                <h4 className="features__additional-card-title">{feature.title}</h4>
                <p className="features__additional-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="features__cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="features__cta-title">Ready to Experience Smart Package Management?</h3>
          <p className="features__cta-description">
            See how Zippora Smart Lockers can transform your property's package delivery experience.
          </p>
          <div className="features__cta-buttons">
            <a href="#demo" className="btn btn-primary">
              Watch Demo Video
            </a>
            <a href="/register" className="btn btn-outline">
              Request Quote
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
