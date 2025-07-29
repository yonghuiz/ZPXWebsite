import React from 'react';

export const Banner00DataSource = {
  wrapper: { className: 'asset_banner0' },
  textWrapper: { className: 'asset_banner0-text-wrapper' },
  title: {
    className: 'asset_banner0-title',
    children: '',
  },
  content: {
    className: 'asset_banner0-content',
    children: '',
  },
  button: { className: 'banner0-button', children: 'Learn More' },
};
export const Banner40DataSource = {
  wrapper: { className: 'home-page-wrapper asset_banner4' },
  page: { className: 'home-page asset_banner4-page' },
  childWrapper: {
    className: 'asset_banner4-title-wrapper',
    children: [
      { name: 'title', children: 'How do we resolve', className: 'asset_banner4-title' },
      {
        name: 'content',
        className: 'asset_banner4-content',
        children: 'Packages are dropped off in designated lockers Residents don’t have to wait at home anymore Residents are notified upon their packages’ arrival Residents pick up their packages 24/7',
      },
      {
        name: 'button',
        children: { href: '#', type: 'primary', children: '' },
      },
    ],
  },
  image: {
    className: 'asset_banner4-image',
    children:
      'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/apartment/pic2_apartment.png',
  },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper asset_content0-wrapper' },
  page: { className: 'home-page asset_content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: 'Suitable Places' }],
  },
  childWrapper: {
    className: 'asset_content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'asset_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'asset_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'asset_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/residential__icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'asset_content0-block-title',
            //   children: 'What a great experience',
            // },
            { name: 'content', children: 'Residential Complex' },
          ],
        },
      },
      {
        name: 'block1',
        className: 'asset_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'asset_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'asset_content0-block-icon',
              children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/school_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'asset_content0-block-title',
            //   children: '一站式事中风险监控',
            // },
            {
              name: 'content',
              className: 'asset_content0-block-text',
              children: 'School/Business',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'asset_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'asset_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'asset_content0-block-icon',
              children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/hospital_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'asset_content0-block-title',
            //   children: '一站式数据运营',
            // },
            {
              name: 'content',
              className: 'asset_content0-block-text',
              children: 'Hospital',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'asset_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'asset_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'asset_content0-block-icon',
              children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/home%20depot_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'asset_content0-block-title',
            //   children: '一站式数据运营',
            // },
            {
              name: 'content',
              children: 'Home depot/Lowes',
            },
          ],
        },
      },
      {
        name: 'block3',
        className: 'asset_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'asset_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'asset_content0-block-icon',
              children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/tool%20rental_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'asset_content0-block-title',
            //   children: '一站式数据运营',
            // },
            {
              name: 'content',
              children: 'Tools Rental/Asset Mgmt',
            },
          ],
        },
      },
    ],
  },
};
export const Content10DataSource = {
  wrapper: { className: 'home-page-wrapper asset_content1-wrapper' },
  OverPack: { className: 'home-page asset_content1', playScale: 0.3 },
  imgWrapper: { className: 'asset_content1-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic1%402x.png',
  },
  textWrapper: { className: 'asset_content1-text', md: 14, xs: 24 },
  title: { className: 'asset_content1-title', children: 'Current Problems' },
  content: {
    className: 'asset_content1-content',
    children:
      (<span>


        .  Office staff, students are sharing tools, equipment or devices, but don’t know the availability, and who is now possessing them, and when they can borrow.  So tools and equipment can not be used efficiently, cost more money for companies or schools to buy more.
        <br />
        <br />
        .  Cost of labor to management the check-in and check-out of the tools and parts.

        <br />
        <br />
        .  No data of the utilization of the tools so to affect the budgeting to buy.
        <br />
        <br />
        .  Customers would like to rent tools when all stores are closed in the nights or holidays.
        <br />
        <br />
        .  Rental stores would like to generate more revenue yet don’t want to pay extra labor fees.
      </span>)
  },
};
export const Content11DataSource = {
  wrapper: { className: 'home-page-wrapper asset_content11-wrapper' },
  OverPack: { className: 'home-page asset_content11', playScale: 0.3 },
  imgWrapper: { className: 'asset_content11-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic2%402x.png',
  },
  textWrapper: { className: 'asset_content11-text', md: 14, xs: 24 },
  title: { className: 'asset_content11-title', children: '' },
  content: {
    className: 'asset_content11-content',
    children: (
      <span>

        <p>
          Free up staff to for tools, parts and equipment management.

        </p>
        <br />

        <p>
          Be able to track all the tools and equipment usage, and the people who are using them.
        </p>
        <br />

      </span>
    )
    // 'Office staff, students are sharing tools, equipment or devices, but don’t know the availability, and who is now possessing them, and when they can borrow.  So tools and equipment can not be used efficiently, cost more money for companies or schools to buy more. <bp>Cost of labor to management the check-in and check-out of the tools and parts.'
  },
};
export const Content12DataSource = {
  wrapper: { className: 'home-page-wrapper asset_content12-wrapper' },
  OverPack: { className: 'home-page asset_content12', playScale: 0.3 },
  imgWrapper: { className: 'asset_content12-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic3%402x.png',
  },
  textWrapper: { className: 'asset_content12-text', md: 14, xs: 24 },
  title: { className: 'asset_content12-title', children: '' },
  content: {
    className: 'asset_content12-content',
    children:
      (<span>

        <p>
          Collect all the data of the utilization, so to improve the efficiency and save the cost
        </p>
        <br />


      </span>)

  },
};

export const Content13DataSource = {
  wrapper: { className: 'home-page-wrapper asset_content13-wrapper' },
  OverPack: { className: 'home-page asset_content13', playScale: 0.3 },
  imgWrapper: { className: 'asset_content13-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/pic4%402x.png',
  },
  textWrapper: { className: 'asset_content13-text', md: 14, xs: 24 },
  title: { className: 'asset_content13-title', children: '' },
  content: {
    className: 'asset_content13-content',
    children: (
      <span>

        <p>
          Tools rental becomes so easy. Operate like a vending machine, customers only need to swipe their cards and pick up the tools you like.


        </p>
        <br />

        <p>

          All transactions are managed by our tool rental locker system, which you can oversee via our cloud management system.
        </p>
        <br />

      </span>
    )
  },
};
export const Content120DataSource = {
  wrapper: { className: 'home-page-wrapper content120-wrapper' },
  page: { className: 'home-page content120' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image',
      },
      { name: 'title', children: 'Suitable Places', className: 'title-h1' },
    ],
  },
  block: {
    className: 'img-wrapper',
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/residential__icon.png',
          },
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/school_icon.png',
          },
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/home%20depot_icon.png',
          },
        },
      },
      {
        name: 'block3',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/hospital_icon.png',
          },
        },
      },
      {
        name: 'block4',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/tool%20rental_icon.png',
          },
        },
      },
     
    ],
  },
};
