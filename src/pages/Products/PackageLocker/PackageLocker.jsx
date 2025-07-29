import React from 'react';
import { motion } from 'framer-motion';
import './PackageLocker.css';

const PackageLocker = () => {
  const appFeatures = [
    {
      id: 1,
      title: 'QR Code Scanner',
      description: 'The one and only App in the market has this amazing function. Package pickup becomes so much fun!',
      icon: '📱'
    },
    {
      id: 2,
      title: 'Instant Notification',
      description: 'Whenever your package is deposited in the locker, you will receive the notification right away. No delay at all!',
      icon: '🔔'
    },
    {
      id: 3,
      title: 'Package Management',
      description: 'Check how many packages are delivered and time, how many packages are overdue, all pickup codes, locations at ease!',
      icon: '📦'
    },
    {
      id: 4,
      title: 'Wallet Management',
      description: 'You can deposit money, withdraw money, check balance, pull out statement, update credit card info etc. all on here.',
      icon: '💳'
    }
  ];

  const services = [
    { title: 'Hardware Product', icon: '🔧' },
    { title: 'Software Support', icon: '💻' },
    { title: 'Installation & Training', icon: '🎯' },
    { title: 'Operation Consulting', icon: '📊' },
    { title: 'Post-sales Service', icon: '🛠️' }
  ];

  const comparisonData = [
    { feature: 'Manufacturer', others: 'No', ours: 'Yes' },
    { feature: 'Direct Distributor', others: 'No', ours: 'Yes' },
    { feature: 'Locker Customization', others: 'No', ours: 'Yes, both hardware and software' },
    { feature: 'Pricing', others: '$$$', ours: '$' },
    { feature: 'Mobile App', others: 'Most no', ours: 'Yes' },
    { feature: 'App Advertising/Messaging', others: 'No', ours: 'Yes' },
    { feature: 'Voice Instruction', others: 'No', ours: 'Yes' },
    { feature: 'IC Card Scanner', others: 'No', ours: 'Yes' },
    { feature: 'Locker Opening Size', others: '3 or 5 size choices', ours: '6 sizes including S, M, L, XL, XXL, Oversize' },
    { feature: 'Package Pickup', others: 'Input pickup code', ours: 'Use App to scan QR code or input pickup code' },
    { feature: 'Notification', others: 'Email, some support text message', ours: '3-way notification via App, text, and email' },
    { feature: 'Customer Service', others: 'Remote', ours: '24/7' },
    { feature: 'Backstage Management System', others: 'Most no', ours: 'Yes' },
    { feature: 'Programs', others: 'Purchase', ours: 'Purchase, Lease, tenant pay participation' },
    { feature: 'Mail-out Option', others: 'Most no', ours: 'Yes' },
    { feature: 'Shipment Charge', others: '$$$', ours: 'Actual 3rd party shipment invoice' },
    { feature: 'All Weather Capability', others: 'No', ours: 'Yes' },
    { feature: 'Custom Wrap', others: 'Most no', ours: 'Yes' },
    { feature: 'Refrigerated lockers', others: 'Most no', ours: 'Yes' }
  ];

  return (
    <div className="package-locker-page">
      {/* Banner Section */}
      <section className="banner-section">
        <div className="banner__container">
          <img 
            src="/images/locker-line-up@2x-1-2048x882.png" 
            alt="Package Locker Line Up"
            className="banner__image"
          />
          <div className="banner__overlay">
            <motion.h1 
              className="banner__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              — PACKAGE LOCKER EXPERT —
            </motion.h1>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works__container">
          <motion.h2 
            className="how-it-works__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How ZipcodeXpress package locker works
          </motion.h2>
          
          <motion.div 
            className="how-it-works__image"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/Prod_Process1.jpg" 
              alt="How ZipcodeXpress package locker works"
              className="how-it-works__img"
            />
          </motion.div>
        </div>
      </section>

      {/* App Features Section */}
      <section className="app-features">
        <div className="app-features__container">
          <motion.h2 
            className="app-features__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Easy to use App
          </motion.h2>
          
          <motion.p 
            className="app-features__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            The exceptional and easy to use features of our App make package management a breeze.
          </motion.p>

          <div className="app-features__grid">
            {appFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="app-feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="app-feature-card__icon">{feature.icon}</div>
                <h3 className="app-feature-card__title">{feature.title}</h3>
                <p className="app-feature-card__description">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="app-download"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://unibox-us.oss-us-east-1.aliyuncs.com/androidapp/zipcodexpress.apk" 
              className="app-download__button"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Please click to download
            </a>
            <p className="app-download__subtitle">Click above install android App</p>
          </motion.div>
        </div>
      </section>

      {/* Worry-Free Service Section */}
      <section className="worry-free-service">
        <div className="worry-free-service__container">
          <motion.h2 
            className="worry-free-service__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Worry-Free Service
          </motion.h2>
          
          <motion.p 
            className="worry-free-service__description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We strive to provide you with the professional and mature smart locker solutions 
            for package retriving and delivery, selling, laundry drop-off, fresh food 
            delivery and food storage etc. We have been in the smart locker field numrous years, 
            own the technologies and IP, and manufacture facility.
          </motion.p>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="service-card__icon">{service.icon}</div>
                <h3 className="service-card__title">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="comparison-section">
        <div className="comparison-section__container">
          <motion.h2 
            className="comparison-section__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
           How we stay superior 
          </motion.h2>
          
          <motion.p 
            className="comparison-section__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            The most economical and advanced state of the art digital "smart locker" parcel 
            storage and pick up system on the market today.
          </motion.p>

          <motion.div 
            className="comparison-table"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="comparison-table__header">
              <div className="comparison-table__cell">Feature</div>
              <div className="comparison-table__cell">Others</div>
              <div className="comparison-table__cell comparison-table__cell--highlight">ZipcodeXpress</div>
            </div>
            
            {comparisonData.map((row, index) => (
              <div key={index} className="comparison-table__row">
                <div className="comparison-table__cell comparison-table__feature">{row.feature}</div>
                <div className="comparison-table__cell">{row.others}</div>
                <div className="comparison-table__cell comparison-table__cell--highlight">{row.ours}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-section__container">
          <motion.h2 
            className="testimonials-section__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Hear their voices!
          </motion.h2>
          
          <motion.div 
            className="testimonials-section__image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/4-key-benefits-1200x500.jpg" 
              alt="ZipcodeXpress Package Lockers - Hear their voices!"
              className="testimonials-section__img"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PackageLocker;
