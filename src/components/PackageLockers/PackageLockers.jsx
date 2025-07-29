import React from 'react';
import { motion } from 'framer-motion';
import './PackageLockers.css';

const PackageLockers = () => {
  const packageLockersData = [
    {
      id: 1,
      image: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/%E7%BB%84%202%402x%2814%29.png',
      title: 'Apartment/Condo',
      content: 'As a property manager, do you feel your precious time is wasted everyday to sign and manage packages? As a resident, have you ever lost your packages or unable to retrieve them after office hours? Zippora is here to solve all the problems!'
    },
    {
      id: 2,
      image: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/%E7%BB%84%202%402x%2813%29.png',
      title: 'Office Center',
      content: 'As a property manager, do you feel the property is not secured when carriers visit offices to deliver packages? As an employee, are you concerned about your privacy when colleagues sign packages for you? Zippora is here to solve all the problems!'
    },
    {
      id: 3,
      image: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/%E7%BB%84%202%402x%2812%29.png',
      title: 'School Campus',
      content: 'As a school faculty, do you feel tedious to handle tons of packages every day for all the teachers and students? As a student, do you often have food delivered to campus yet you are right in the middle of a class? Zippora is here to solve all the problems!'
    },
    {
      id: 4,
      image: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/%E7%BB%84%202%402x%2811%29.png',
      title: 'Grocery Store',
      content: 'As a store manager, don\'t you think you are spending too much time on helping customers to pickup their groceries? As a grocery shopper, do you feel you have wasted too much time on pushing a shopping cart around and waiting to pay? Zippora is here to solve all the problems!'
    }
  ];

  return (
    <section className="package-lockers">
      <div className="package-lockers__container">
        <motion.div
          className="package-lockers__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="package-lockers__title">Zippora Package Smart Lockers</h2>
        </motion.div>

        <div className="package-lockers__grid">
          {packageLockersData.map((item, index) => (
            <motion.div
              key={item.id}
              className="package-lockers__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="package-lockers__icon">
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              
              <h3 className="package-lockers__card-title">{item.title}</h3>
              
              <p className="package-lockers__card-content">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageLockers;
