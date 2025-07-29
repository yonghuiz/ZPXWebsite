import React from 'react';
import { motion } from 'framer-motion';
import './ExperienceSection.css';

const ExperienceSection = () => {
  return (
    <section className="experience-section">
      <div className="experience-section__container">
        <motion.div
          className="experience-section__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="experience-section__title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Seeking Great Experience With ZipcodeXpress
          </motion.h2>
          
          <motion.blockquote 
            className="experience-section__quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            "The App is just amazing! I scan that QR code every time I come to pick up my packages. See today I got two packages within 1 second."
          </motion.blockquote>
          
          <motion.div 
            className="experience-section__author"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            John, user of Zippora Package Smart Locker 10006
          </motion.div>
          
          <motion.div 
            className="experience-section__date"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            2019.01.06 / Austin TX
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
