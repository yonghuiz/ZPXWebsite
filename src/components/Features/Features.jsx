import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  // Hardcoded data for testing
  const testData = {
    wrapper: { className: 'home-page-wrapper home_content3-wrapper' },
    page: { className: 'home-page home_content3' },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'title',
          children: 'Zippora Smart Technologies',
          className: 'title-h1',
        },
        {
          name: 'home_content',
          className: 'title-content',
          children: 'We are always drive to develop the best technologies possible for our dear clients. Your convenience and satisfaction is our goal!',
        },
      ],
    },
    block: {
      className: 'home_content3-block-wrapper',
      children: [
        {
          name: 'block0',
          className: 'home_content3-block',
          children: {
            icon: {
              className: 'home_content3-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
            },
            textWrapper: { className: 'home_content3-text' },
            title: { className: 'home_content3-title', children: 'Cell Phone App' },
            content: {
              className: 'home_content3-content',
              children: 'Android and iOS cell phone both available, very user friendly. Property management is able to post notification and ads via this amazing App. Download to know more.',
            },
          },
        },
        {
          name: 'block1',
          className: 'home_content3-block',
          children: {
            icon: {
              className: 'home_content3-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
            },
            textWrapper: { className: 'home_content3-text' },
            title: { className: 'home_content3-title', children: 'IC Card Reader' },
            content: {
              className: 'home_content3-content',
              children: 'Property managers scan IC card to log in to manage all parcel lockers at the touchscreen. We also provide a Locker Admin code for managers. Locker management becomes easy.',
            },
          },
        },
        {
          name: 'block2',
          className: 'home_content3-block',
          children: {
            icon: {
              className: 'home_content3-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
            },
            textWrapper: { className: 'home_content3-text' },
            title: { className: 'home_content3-title', children: 'QR Scanner' },
            content: {
              className: 'home_content3-content',
              children: 'ZipcodeXpress is the first and only package locker company to provide such cool and fun feature. Recipients can simply retrieve packages by scanning QR code via cell phone App.',
            },
          },
        },
        {
          name: 'block3',
          className: 'home_content3-block',
          children: {
            icon: {
              className: 'home_content3-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
            },
            textWrapper: { className: 'home_content3-text' },
            title: { className: 'home_content3-title', children: 'Access Code Login' },
            content: {
              className: 'home_content3-content',
              children: 'You can either scan the QR code or input access code to login. The access code will be sent to you 3 WAYS via email, text messaging and your cell phone App. No notification delay at all.',
            },
          },
        },
        {
          name: 'block4',
          className: 'home_content3-block',
          children: {
            icon: {
              className: 'home_content3-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
            },
            textWrapper: { className: 'home_content3-text' },
            title: { className: 'home_content3-title', children: 'Various Locker Sizes' },
            content: {
              className: 'home_content3-content',
              children: '6 lockers opening sizes including S, M, L, XL, XXL and oversize. No matter irregular shaped packages or oversized packages, our locker can "swallow" them all! Plus we can always add an add-on unit per your request!',
            },
          },
        },
        {
          name: 'block5',
          className: 'home_content3-block',
          children: {
            icon: {
              className: 'home_content3-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
            },
            textWrapper: { className: 'home_content3-text' },
            title: { className: 'home_content3-title', children: 'Video Surveillance Camera' },
            content: {
              className: 'home_content3-content',
              children: '24/7 security surveillance camera. High definition motion captured videos with both audio and picture. Provides 48 hours play-back. Cell phone App live surveillance available.',
            },
          },
        },
      ],
    },
  };

  return (
    <section className={testData.wrapper.className}>
      <div className="features-container">
        <div className={testData.page.className}>
          {/* Title Section */}
          <div className={testData.titleWrapper.className}>
            <h2 className="title-h1">
              Zippora Smart Technologies
            </h2>
            <p className="title-content">
              We are always drive to develop the best technologies possible for our dear clients. Your convenience and satisfaction is our goal!
            </p>
          </div>

          {/* Features Grid */}
          <div className={testData.block.className}>
            {testData.block.children.map((block, index) => (
              <div
                key={block.name}
                className={block.className}
              >
                <div className="home_content3-block-item">
                  <div className={block.children.icon.className}>
                    <img 
                      src={block.children.icon.children} 
                      alt={block.children.title.children}
                      width="50"
                      height="50"
                    />
                  </div>
                  <div className={block.children.textWrapper.className}>
                    <h3 className={block.children.title.className}>
                      {block.children.title.children}
                    </h3>
                    <p className={block.children.content.className}>
                      {block.children.content.children}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
