import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Peterson',
      title: 'Property Manager',
      company: 'Avalon Communities',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      testimonial: 'The App is just amazing! I scan that QR code every time I come to pick up my packages. See today I got two packages within 1 second. The convenience is unmatched.',
      featured: true
    },
    {
      id: 2,
      name: 'Sarah Martinez',
      title: 'Facilities Director',
      company: 'Urban Office Spaces',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      testimonial: 'ZipcodeXpress has revolutionized our package management. No more lost packages, no more interruptions during meetings. Our tenants love the 24/7 access.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'On-Campus housing Operations Manager',
      company: 'State University',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      testimonial: 'Managing packages for 5000 students was a nightmare before Zippora. Now everything is automated, secure, and efficient. Students and staff both love it.'
    },
    {
      id: 4,
      name: 'Lisa Thompson',
      title: 'Store Manager',
      company: 'Fresh Market Plus',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      testimonial: 'Our customers love the convenience of our smart lockers. They can pick up their groceries anytime, and we\'ve seen a significant increase in customer satisfaction.'
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials__header-section">
        <div className="testimonials__container">
          <motion.div
            className="testimonials__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="testimonials__title">What Our Customers Say</h2>
            <p className="testimonials__subtitle">
              Hear from property managers, facility directors, and business owners who've 
              transformed their package management with ZipcodeXpress.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="testimonials__content-section">
        <div className="testimonials__container">
          <div className="testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonials__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="testimonials__quote-icon">
                  <FaQuoteLeft />
                </div>
                
                <div className="testimonials__rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="testimonials__star" />
                  ))}
                </div>

                <blockquote className="testimonials__quote">
                  "{testimonial.testimonial}"
                </blockquote>

                <div className="testimonials__author">
                  <div className="testimonials__author-image">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="testimonials__author-info">
                    <div className="testimonials__author-name">{testimonial.name}</div>
                    <div className="testimonials__author-title">{testimonial.title}</div>
                    <div className="testimonials__author-company">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="testimonials__stats"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="testimonials__stat">
              <div className="testimonials__stat-number">4.9/5</div>
              <div className="testimonials__stat-label">Customer Rating</div>
            </div>
            <div className="testimonials__stat">
              <div className="testimonials__stat-number">100+</div>
              <div className="testimonials__stat-label">Happy Customers</div>
            </div>
            <div className="testimonials__stat">
              <div className="testimonials__stat-number">99.9%</div>
              <div className="testimonials__stat-label">Uptime Reliability</div>
            </div>
            <div className="testimonials__stat">
              <div className="testimonials__stat-number">24/7</div>
              <div className="testimonials__stat-label">Support Available</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
