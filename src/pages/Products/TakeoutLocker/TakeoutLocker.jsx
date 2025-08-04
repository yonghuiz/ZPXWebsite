import React from 'react';
import { motion } from 'framer-motion';
import './TakeoutLocker.css';

const TakeoutLocker = () => {
  const features = [
    {
      id: 1,
      title: 'Visual Accessible Lockers',
      description: 'Clear transparent locker doors not only make the locker looks elegant but also make it easy for you to check your food.',
      icon: '👁️'
    },
    {
      id: 2,
      title: 'Adjustable Temperature',
      description: 'No matter refrigerated temperature or heated temperature, it\'s so easy to adjust and deposit the food in.',
      icon: '🌡️'
    },
    {
      id: 3,
      title: 'Customizable Appearance',
      description: 'You can select a color tone you like or a wrap pattern you like. We will make the locker with your identity.',
      icon: '🎨'
    }
  ];

  const suitablePlaces = [
    { title: 'Business/Factory Center', icon: '🏢' },
    { title: 'School/Corporate Campus', icon: '🎓' },
    { title: 'Residential Complex or Restaurant', icon: '🏠' }
  ];

  return (
    <div className="takeout-locker-page">
      {/* Banner Section */}
      <section className="banner-section">
        <div className="banner__container">
          <img 
            src="/images/ProductLine-1.jpg" 
            alt="ZipcodeXpress Food Takeout Locker"
            className="banner__image"
          />
          <div className="banner__overlay">
            <div className="banner__content">
              <motion.h1 
                className="banner__title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                — PACKAGE LOCKER EXPERT —
              </motion.h1>
              
              <motion.div 
                className="banner__deposit-info"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="banner__deposit-title">Deposit. Storage. Pickup.</h2>
                <p className="banner__deposit-subtitle">
                  ZipcodeXpress Food Takeout Locker makes your busy day a little easier.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-section__container">
          <motion.h2 
            className="features-section__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Cool Takeout Locker Features
          </motion.h2>
          
          <motion.p 
            className="features-section__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We are used to be the leader in technology development and bringing your brand-new experience
          </motion.p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Locker Image Section */}
      <section className="food-locker-image">
        <div className="food-locker-image__container">
          <motion.div 
            className="food-locker-image__wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/foodlocker2.jpg" 
              alt="ZipcodeXpress Food Locker"
              className="food-locker-image__img"
            />
          </motion.div>
        </div>
      </section>

      {/* Suitable Places Section */}
      <section className="suitable-places">
        <div className="suitable-places__container">
          <motion.h2 
            className="suitable-places__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Suitable Places
          </motion.h2>
          
          <motion.p 
            className="suitable-places__description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            There are many businesses and organizations need such a great locker
          </motion.p>

          <div className="places-grid">
            {suitablePlaces.map((place, index) => (
              <motion.div
                key={index}
                className="place-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="place-card__icon">{place.icon}</div>
                <h3 className="place-card__title">{place.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TakeoutLocker;
