import React from 'react';
import './Gallery.css';

const Gallery = () => {
  return (
    <div className="gallery">
      <div className="gallery__hero">
        <div className="container">
          <h1 className="gallery__title">Gallery</h1>
          <p className="gallery__subtitle">Explore our package locker installations worldwide</p>
        </div>
      </div>
      
      <div className="gallery__content">
        <div className="container">
          <div className="gallery__embed">
            <iframe
              src="https://zipcodexpress.pixieset.com/packagelockerinstallations/"
              title="ZipcodeXpress Package Locker Installations Gallery"
              className="gallery__iframe"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          
          <div className="gallery__info">
            <h2>Package Locker Installations</h2>
            <p>
              Discover our diverse range of package locker installations across various industries and locations. 
              From apartment complexes to office buildings, schools to retail centers, see how ZipcodeXpress 
              solutions are transforming package management worldwide.
            </p>
            <div className="gallery__features">
              <div className="gallery__feature">
                <h3>Residential Solutions</h3>
                <p>Modern package lockers for apartment buildings and residential complexes</p>
              </div>
              <div className="gallery__feature">
                <h3>Commercial Installations</h3>
                <p>Professional package management systems for office buildings and retail spaces</p>
              </div>
              <div className="gallery__feature">
                <h3>Educational Facilities</h3>
                <p>Secure locker solutions for schools, universities, and educational institutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
