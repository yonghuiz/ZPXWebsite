import React from 'react';
import { motion } from 'framer-motion';
import './CustomerLogos.css';

const CustomerLogos = () => {
  // Customer logos - using actual customer logo files
  const customerLogos = [
    {
      name: "100% Satisfaction",
      logo: "/customer-logos/100-percent-satisfaction.png",
      alt: "100% Satisfaction Guarantee"
    },
    {
      name: "Christopher Commercial Inc",
      logo: "/customer-logos/Christopher-Commercial-Inc..png",
      alt: "Christopher Commercial Inc"
    },
    {
      name: "Clear",
      logo: "/customer-logos/Clear.jpg",
      alt: "Clear"
    },
    {
      name: "Greystar",
      logo: "/customer-logos/greystar.jpg",
      alt: "Greystar Real Estate Partners"
    },
    {
      name: "Horizon",
      logo: "/customer-logos/Horizon.jpg",
      alt: "Horizon"
    },
    {
      name: "Internacional",
      logo: "/customer-logos/Internatcional.jpg",
      alt: "Internacional"
    },
    {
      name: "Lincoln Property",
      logo: "/customer-logos/LincolnProperty.jpg",
      alt: "Lincoln Property Company"
    },
    {
      name: "MAA",
      logo: "/customer-logos/MAA.png",
      alt: "MAA"
    },
    {
      name: "Christopher Commercial Inc",
      logo: "/customer-logos/Christopher-Commercial-Inc..png",
      alt: "Christopher Commercial Inc"
    },
    {
      name: "Clear",
      logo: "/customer-logos/Clear.jpg",
      alt: "Clear"
    },
    {
      name: "Horizon",
      logo: "/customer-logos/Horizon.jpg",
      alt: "Horizon"
    }
  ];

  // Duplicate the logos array to create seamless infinite scroll
  const duplicatedLogos = [...customerLogos, ...customerLogos];

  return (
    <section className="customer-logos">
      <div className="customer-logos__container">
        <motion.div
          className="customer-logos__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="customer-logos__title">
            Trusted by Property Managers Nationwide
          </h2>
          <p className="customer-logos__subtitle">
            Join 1,000+ satisfied customers who trust ZipcodeXpress for their package management needs
          </p>
        </motion.div>

        <div className="customer-logos__carousel">
          <div className="customer-logos__track">
            {duplicatedLogos.map((customer, index) => (
              <div
                key={`${customer.name}-${index}`}
                className="customer-logos__item"
              >
                <img
                  src={customer.logo}
                  alt={customer.alt}
                  className="customer-logos__image"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="customer-logos__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="customer-logos__cta">
            Want to join these industry leaders? 
            <a href="#quote" className="customer-logos__link">
              Request a quote today
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerLogos;
