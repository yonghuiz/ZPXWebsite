import React from 'react';

export const Banner00DataSource = {
  wrapper: { className: 'ecommerce_banner0' },
  textWrapper: { className: 'ecommerce_banner0-text-wrapper' },
  title: {
    className: 'ecommerce_banner0-title',
    children: '',
  },
  content: {
    className: 'ecommerce_banner0-content',
    children: '',
  },
  button: { className: 'banner0-button', children: 'Learn More', href:"#Content1_0" },
};
export const Banner40DataSource = {
  wrapper: { className: 'home-page-wrapper ecommerce_banner4' },
  page: { className: 'home-page ecommerce_banner4-page' },
  childWrapper: {
    className: 'ecommerce_banner4-title-wrapper',
    children: [
      { name: 'title', children: 'How do we resolve', className: 'ecommerce_banner4-title' },
      {
        name: 'content',
        className: 'ecommerce_banner4-content',
        children: 'Packages are dropped off in designated lockers Residents don’t have to wait at home anymore Residents are notified upon their packages’ arrival Residents pick up their packages 24/7',
      },
      {
        name: 'button',
        children: { href: '#', type: 'primary', children: '' },
      },
    ],
  },
  image: {
    className: 'ecommerce_banner4-image',
    children:
      'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/apartment/pic2_apartment.png',
  },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper ecommerce_content0-wrapper' },
  page: { className: 'home-page ecommerce_content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: 'Suitable Places' }],
  },
  childWrapper: {
    className: 'ecommerce_content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'ecommerce_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'ecommerce_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'ecommerce_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/residential__icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'ecommerce_content0-block-title',
            //   children: 'What a great experience',
            // },
            { name: 'content', children: 'Residential Complex' },
          ],
        },
      },
      {
        name: 'block1',
        className: 'ecommerce_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'ecommerce_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'ecommerce_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/school_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'ecommerce_content0-block-title',
            //   children: '一站式事中风险监控',
            // },
            {
              name: 'content',
              className: 'ecommerce_content0-block-text',
              children: 'School/Business',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'ecommerce_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'ecommerce_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'ecommerce_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/hospital_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'ecommerce_content0-block-title',
            //   children: '一站式数据运营',
            // },
            {
              name: 'content',
              className: 'ecommerce_content0-block-text',
              children: 'Hospital',
            },
          ],
        },
      },
      {
        name: 'block3',
        className: 'ecommerce_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'ecommerce_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'ecommerce_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/home%20depot_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'ecommerce_content0-block-title',
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
        name: 'block4',
        className: 'ecommerce_content0-block',
        md: 4,
        xs: 24,
        children: {
          className: 'ecommerce_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'ecommerce_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/tool%20rental_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'ecommerce_content0-block-title',
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
  wrapper: { className: 'home-page-wrapper ecommerce_content1-wrapper' },
  OverPack: { className: 'home-page ecommerce_content1', playScale: 0.3 },
  imgWrapper: { className: 'ecommerce_content1-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/ECOMMERCE_slices/pic_1%402x.png',
  },
  textWrapper: { className: 'ecommerce_content1-text', md: 14, xs: 24 },
  title: { className: 'ecommerce_content1-title', children: 'Current Problems' },
  content: {
    className: 'ecommerce_content1-content',
    children:
      (<span>



        <br />
        <br />
        Customers feels they spend too much time in the store to look for something, looking for more convenient and time-saving way to get what they need?

        <br />
        <br />

      </span>)
  },
};
export const Content11DataSource = {
  wrapper: { className: 'home-page-wrapper ecommerce_content11-wrapper' },
  OverPack: { className: 'home-page ecommerce_content11', playScale: 0.3 },
  imgWrapper: { className: 'ecommerce_content11-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/ECOMMERCE_slices/pic_2%402x.png',
  },
  textWrapper: { className: 'ecommerce_content11-text', md: 14, xs: 24 },
  title: { className: 'ecommerce_content11-title', children: '' },
  content: {
    className: 'ecommerce_content11-content',
    children: (
      <span>

        <p>


        </p>
        <br />

        <p>
          With our smart locker solution, you can put our smart locker outside or inside your store, customer can just stop by on their way to home or office, and pick up their orders online right away.
        </p>
        <br />

      </span>
    )
    // 'Office staff, students are sharing tools, equipment or devices, but don’t know the availability, and who is now possessing them, and when they can borrow.  So tools and equipment can not be used efficiently, cost more money for companies or schools to buy more. <bp>Cost of labor to management the check-in and check-out of the tools and parts.'
  },
};
export const Content12DataSource = {
  wrapper: { className: 'home-page-wrapper ecommerce_content12-wrapper' },
  OverPack: { className: 'home-page ecommerce_content12', playScale: 0.3 },
  imgWrapper: { className: 'ecommerce_content12-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/ECOMMERCE_slices/pic_3%402x.png',
  },
  textWrapper: { className: 'ecommerce_content12-text', md: 14, xs: 24 },
  title: { className: 'ecommerce_content12-title', children: '' },
  content: {
    className: 'ecommerce_content12-content',
    children:
      (<span>

        <p>
          And we also can work with grocery stores to deliver the product to customers’ nearest lockers in their zipcode so that customers do need to come to the store, make them even more convenient and more importantly with very low cost for both grocery stores and customers

        </p>
        <br />


      </span>)

  },
};

export const Content13DataSource = {
  wrapper: { className: 'home-page-wrapper ecommerce_content13-wrapper' },
  OverPack: { className: 'home-page ecommerce_content13', playScale: 0.3 },
  imgWrapper: { className: 'ecommerce_content13-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/ECOMMERCE_slices/pic_4%402x.png',
  },
  // imgWrapper: { className: 'ecommerce_content13-img', md: 12, xs: 24 },
  // img1: {
  //   children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/ECOMMERCE_slices/pic_4%402x.png',
  // },
  textWrapper: { className: 'ecommerce_content13-text', md: 14, xs: 24 },
  title: { className: 'ecommerce_content13-title', children: '' },
  content: {
    className: 'ecommerce_content13-content',
    children: (
      <span>
        <p>
          We also provide lockers with cooling and thermal-control features to keep customers orders fresh even they can’t be on time to pick up.
        </p>
        <br />
        <p>
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
