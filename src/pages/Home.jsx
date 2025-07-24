import React from 'react';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import CustomerLogos from '../components/CustomerLogos/CustomerLogos';
import Features from '../components/Features/Features';
import Testimonials from '../components/Testimonials/Testimonials';

const Home = () => {
  return (
    <div className="home-page">
      <ImageCarousel />
      <CustomerLogos />
      <Features />
      <Testimonials />
    </div>
  );
};

export default Home;
