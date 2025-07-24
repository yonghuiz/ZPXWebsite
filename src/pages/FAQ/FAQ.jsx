import React, { useState } from 'react';
import './FAQPage.css';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is ZipcodeXpress?",
          answer: "ZipcodeXpress is a leading provider of smart package locker solutions designed to streamline package delivery and management for apartments, offices, schools, and retail locations. Our secure, automated systems ensure packages are safely stored and easily accessible to recipients."
        },
        {
          question: "How do package lockers work?",
          answer: "Our package lockers use advanced technology to receive, secure, and distribute packages. When a delivery arrives, the system automatically assigns an available locker, sends a notification to the recipient with a unique access code, and tracks the entire process until pickup."
        },
        {
          question: "What types of properties benefit from package lockers?",
          answer: "Package lockers are ideal for apartment complexes, office buildings, universities, schools, retail centers, and any location with high package volume. They're particularly beneficial for properties where secure package storage and 24/7 access are important."
        }
      ]
    },
    {
      category: "Installation & Setup",
      questions: [
        {
          question: "How long does installation take?",
          answer: "Typical installation takes 1-3 days depending on the size and complexity of the system. Our certified technicians handle all aspects of installation including electrical connections, network setup, and system testing."
        },
        {
          question: "What are the space requirements?",
          answer: "Space requirements vary based on your needs and package volume. Our smallest units require as little as 6 square feet, while larger installations may need 50+ square feet. We provide detailed space planning during the consultation process."
        },
        {
          question: "Do you provide training?",
          answer: "Yes! We provide comprehensive training for property staff, including system operation, basic troubleshooting, and user management. We also offer ongoing support and additional training as needed."
        }
      ]
    },
    {
      category: "Technology & Features",
      questions: [
        {
          question: "What notification methods are available?",
          answer: "Recipients can receive notifications via email, SMS text message, or through our mobile app. Notifications include pickup instructions, access codes, and reminder messages. Property managers can customize notification preferences."
        },
        {
          question: "Is the system secure?",
          answer: "Absolutely. Our lockers feature multiple security layers including encrypted access codes, tamper detection, security cameras (optional), and audit trails. Each locker can only be opened by the intended recipient or authorized personnel."
        },
        {
          question: "Can the system integrate with existing software?",
          answer: "Yes, our systems can integrate with property management software, access control systems, and other building technologies. We offer APIs and custom integration services to ensure seamless operation with your existing infrastructure."
        }
      ]
    },
    {
      category: "Support & Maintenance",
      questions: [
        {
          question: "What support do you provide?",
          answer: "We offer 24/7 technical support, regular system maintenance, software updates, and emergency service. Our support team can remotely diagnose and resolve many issues, with on-site service available when needed."
        },
        {
          question: "What happens if a locker malfunctions?",
          answer: "Our systems include redundant safety features and automatic error reporting. If a locker malfunctions, the system alerts our support team immediately, and we can often resolve issues remotely. For hardware problems, we provide rapid on-site service."
        },
        {
          question: "Are software updates included?",
          answer: "Yes, all software updates and feature enhancements are included in your service agreement. Updates are typically deployed automatically during off-peak hours to minimize disruption."
        }
      ]
    }
  ];

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero__container">
          <h1 className="faq-hero__title">Frequently Asked Questions</h1>
          <p className="faq-hero__subtitle">
            Find answers to common questions about our package locker solutions
          </p>
        </div>
      </section>

      <section className="faq-content">
        <div className="faq-content__container">
          <div className="faq-intro">
            <h2>Get the Answers You Need</h2>
            <p>
              Have questions about our package locker solutions? Browse our frequently 
              asked questions below. If you can't find what you're looking for, 
              don't hesitate to contact our support team.
            </p>
          </div>

          <div className="faq-categories">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category">
                <h3 className="category-title">{category.category}</h3>
                <div className="faq-items">
                  {category.questions.map((item, itemIndex) => {
                    const uniqueIndex = `${categoryIndex}-${itemIndex}`;
                    return (
                      <div key={uniqueIndex} className="faq-item">
                        <button
                          className={`faq-question ${openItems[uniqueIndex] ? 'active' : ''}`}
                          onClick={() => toggleItem(uniqueIndex)}
                        >
                          <span>{item.question}</span>
                          <span className="faq-icon">
                            {openItems[uniqueIndex] ? '−' : '+'}
                          </span>
                        </button>
                        <div className={`faq-answer ${openItems[uniqueIndex] ? 'open' : ''}`}>
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact">
            <h2>Still Have Questions?</h2>
            <p>
              Our support team is here to help! Contact us for personalized assistance 
              with your specific needs and requirements.
            </p>
            <div className="contact-options">
              <div className="contact-option">
                <h4>Email Support</h4>
                <p>support@zipcodexpress.com</p>
              </div>
              <div className="contact-option">
                <h4>Phone Support</h4>
                <p>(555) 234-5678</p>
              </div>
              <div className="contact-option">
                <h4>Business Hours</h4>
                <p>Monday - Friday: 8 AM - 6 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
