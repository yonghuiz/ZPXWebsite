import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import headpic1 from '../../assets/headpic1.png';
import headpic2 from '../../assets/headpic2.png';
import ziplocker3 from '../../assets/Ziplocker-3.jpg';
import './ImageCarousel.css';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: headpic1,
      fallbackGradient: 'linear-gradient(135deg, #0066cc 0%, #004499 50%, #00cc66 100%)',
       title: '— PACKAGE LOCKER EXPERT —',
     
      subtitle: 'With ZipcodeXpress Smart Locker Solutions',
      description: 'Enjoy your package receiving and handling experience',
      buttonText: 'Request a Quote',
      buttonLink: '/register'
    },
    {
      id: 2,
      image: headpic2,
      fallbackGradient: 'linear-gradient(135deg, #ff6600 0%, #cc5500 50%, #0066cc 100%)',
      title: 'SMART TECHNOLOGY',
      subtitle: 'QR code and mobile app access',
      description: 'Scan QR codes or use our mobile app for instant package retrieval',
      buttonText: null,
      buttonLink: null
    },
    {
      id: 3,
      image: ziplocker3,
      fallbackGradient: 'linear-gradient(135deg, #00cc66 0%, #0099cc 50%, #0066cc 100%)',
      title: 'SECURE & CONVENIENT',
      subtitle: '24/7 PACKAGE ACCESS',
      description: 'Access your packages anytime with our secure smart locker system',
      buttonText: null,
      buttonLink: null
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="carousel-slide"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="slide-background" data-slide={currentSlide}>
              <div 
                className={`slide-image slide-image-${currentSlide}`}
                style={{
                  backgroundImage: `url(${slides[currentSlide].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center left',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
            
            <div className={`slide-content ${currentSlide === 2 ? 'slide-content--dark-bg' : ''}`}>
              <motion.h1
                className="slide-title"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.h2
                className="slide-subtitle"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p
                className="slide-description"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              
              <motion.div
                className="slide-actions"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {slides[currentSlide].buttonText && slides[currentSlide].buttonLink && (
                  <Link
                    to={slides[currentSlide].buttonLink}
                    className="btn btn-primary carousel-btn"
                  >
                    {slides[currentSlide].buttonText}
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          className="carousel-nav carousel-nav--prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#8249;
        </button>
        <button
          className="carousel-nav carousel-nav--next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#8250;
        </button>

        {/* Slide Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentSlide ? 'carousel-indicator--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
