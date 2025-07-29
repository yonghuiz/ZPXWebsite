import React from 'react';

export const Banner00DataSource = {
  wrapper: { className: 'food_banner0' },
  textWrapper: { className: 'food_banner0-text-wrapper' },
  title: {
    className: 'food_banner0-title',
    children: '',
  },
  content: {
    className: 'food_banner0-content',
    children: '',
  },
  button: { className: 'banner0-button', children: 'Learn More' },
};
export const Banner40DataSource = {
  wrapper: { className: 'home-page-wrapper food_banner4' },
  page: { className: 'home-page food_banner4-page' },
  childWrapper: {
    className: 'food_banner4-title-wrapper',
    children: [
      { name: 'title', children: 'How do we resolve', className: 'food_banner4-title' },
      {
        name: 'content',
        className: 'food_banner4-content',
        children: 'Packages are dropped off in designated lockers Residents don’t have to wait at home anymore Residents are notified upon their packages’ arrival Residents pick up their packages 24/7',
      },
      {
        name: 'button',
        children: { href: '#', type: 'primary', children: '' },
      },
    ],
  },
  image: {
    className: 'food_banner4-image',
    children:
      'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/apartment/pic2_apartment.png',
  },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper food_content0-wrapper' },
  page: { className: 'home-page food_content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: 'Suitable Places' }],
  },
  childWrapper: {
    className: 'food_content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'food_content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'food_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'food_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/residential__icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'food_content0-block-title',
            //   children: 'What a great experience',
            // },
            { name: 'content', 
            className: 'food_content0-block-text',
            children: 'Residential Complex' },
          ],
        },
      },
      {
        name: 'block1',
        className: 'food_content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'food_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'food_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/school_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'food_content0-block-title',
            //   children: '一站式事中风险监控',
            // },
            {
              name: 'content',
              className: 'food_content0-block-text',
              children: 'School Campus',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'food_content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'food_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'food_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/tools_rental/hospital_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'food_content0-block-title',
            //   children: '一站式数据运营',
            // },
            {
              name: 'content',
              className: 'food_content0-block-text',
              children: 'Hospital',
            },
          ],
        },
      },
      {
        name: 'block3',
        className: 'food_content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'food_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'food_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/Food%20Service_slices/office_icon.png',
            },
            // {
            //   name: 'title',
            //   className: 'food_content0-block-title',
            //   children: '一站式数据运营',
            // },
            {
              name: 'content',
              className: 'food_content0-block-text',
              children: 'Office Center',
            },
          ],
        },
      },
   
    ],
  },
};
export const Content10DataSource = {
  wrapper: { className: 'home-page-wrapper food_content1-wrapper' },
  OverPack: { className: 'home-page food_content1', playScale: 0.3 },
  imgWrapper: { className: 'food_content1-img', md: 10, xs: 24 },
  img: {
    children: 'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/Food%20Service_slices/pic1%402x.png',
  },
  textWrapper: { className: 'food_content1-text', md: 14, xs: 24 },
  title: { className: 'food_content1-title', children: 'Current Problems' },
  content: {
    className: 'food_content1-content',
    children:
      (<span>
        Have you experienced that due to a long meeting, you have to call for a food delivery, yet you can’t go out to fetch food but worry that the food will get cold? <br />
        <br />

        Or you called for food delivery, due to bad traffic, can’t make it home on time?
        <br />
        <br />

      </span>)
  },
};
export const Content30DataSource = {
  wrapper: { className: 'home-page-wrapper food_content3-wrapper' },
  page: { className: 'home-page food_content3' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: '蚂蚁金融云提供专业的服务',
        className: 'title-h1',
      },
      {
        name: 'content',
        className: 'title-content',
        children: '基于阿里云强大的基础资源',
      },
    ],
  },
  block: {
    className: 'food_content3-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'food_content3-block',
        md: 24,
        xs: 24,
        children: {
          icon: {

            className: 'food_content3-icon',
            md: 12,
            xs: 24,
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/b007a8a5f49f743c1ab1d629ca292248c781be82.png',
          },
          textWrapper: { className: 'food_content3-text', md: 12, xs: 24 },
          title: { className: 'food_content3-title', children: 'Food Delivery' },
          content: {
            className: 'food_content3-content',
            children:
              'Food from now on can be easily delivered to your locker. You can fetch it right after class.',
          },
        },
      },
      {
        name: 'block1',
        className: 'food_content3-block',
        md: 24,
        xs: 24,
        children: {
          icon: {
            className: 'food_content3-icon',
            md: 12,
            xs: 24,
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/18da086b5a6389c3d8ea0c7d8f2a727548551f82.png',
          },
          textWrapper: { className: 'food_content3-text', md: 12, xs: 24 },
          title: { className: 'food_content3-title', children: 'No Interruption' },
          content: {
            className: 'food_content3-content',
            children:
              'Now school faculty can take their hands out to handle things more important. No more hiring required.',
          },
        },
      },
      // {
      //   name: 'block2',
      //   className: 'food_content3-block',
      //   md: 8,
      //   xs: 24,
      //   children: {
      //     icon: {
      //       className: 'food_content3-icon',
      //       children:
      //         'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
      //     },
      //     textWrapper: { className: 'food_content3-text' },
      //     title: { className: 'food_content3-title', children: '云监控' },
      //     content: {
      //       className: 'food_content3-content',
      //       children:
      //         '分布式云环境集中监控，统一资源及应用状态视图，智能分析及故障定位。',
      //     },
      //   },
      // },
      // {
      //   name: 'block3',
      //   className: 'food_content3-block',
      //   md: 8,
      //   xs: 24,
      //   children: {
      //     icon: {
      //       className: 'food_content3-icon',
      //       children:
      //         'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
      //     },
      //     textWrapper: { className: 'food_content3-text' },
      //     title: { className: 'food_content3-title', children: '移动' },
      //     content: {
      //       className: 'food_content3-content',
      //       children:
      //         '一站式移动金融APP开发及全面监控；丰富可用组件，动态发布和故障热修复。',
      //     },
      //   },
      // },
      // {
      //   name: 'block4',
      //   className: 'food_content3-block',
      //   md: 8,
      //   xs: 24,
      //   children: {
      //     icon: {
      //       className: 'food_content3-icon',
      //       children:
      //         'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
      //     },
      //     textWrapper: { className: 'food_content3-text' },
      //     title: { className: 'food_content3-title', children: '分布式中间件' },
      //     content: {
      //       className: 'food_content3-content',
      //       children:
      //         '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。',
      //     },
      //   },
      // },
      // {
      //   name: 'block5',
      //   className: 'food_content3-block',
      //   md: 8,
      //   xs: 24,
      //   children: {
      //     icon: {
      //       className: 'food_content3-icon',
      //       children:
      //         'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
      //     },
      //     textWrapper: { className: 'food_content3-text' },
      //     title: { className: 'food_content3-title', children: '大数据' },
      //     content: {
      //       className: 'food_content3-content',
      //       children:
      //         '一站式、全周期大数据协同工作平台，PB级数据处理、毫秒级数据分析工具。',
      //     },
      //   },
      // },
    ],
  },
};
export const Feature70DataSource = {
  wrapper: { className: 'home-page-wrapper food_feature7-wrapper' },
  page: { className: 'home-page food_feature7' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'food_feature7-title-wrapper',
    children: [
      {
        name: 'title',
        className: 'food_feature7-title-h1',
        children: '图像在线服务',
      },
      {
        name: 'content',
        className: 'food_feature7-title-content',
        children: '你可以直接快速接入图像能力',
      },
    ],
  },
  blockWrapper: {
    className: 'food_feature7-block-wrapper',
    gutter: 24,
    children: [
      {
        md: 6,
        xs: 24,
        name: 'block0',
        className: 'food_feature7-block',
        children: {
          className: 'food_feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'food_feature7-block-image',
              children:
                'https://bucket.mlcdn.com/a/1736/1736632/images/acfe55401bfc35949aaa9b49ac9b3fb6ec4a1df7.png',
            },
            {
              name: 'title',
              className: 'food_feature7-block-title',
              children: '',
            },
            {
              name: 'content',
              className: 'food_feature7-block-content',
              children: 'No more multiple attempts to deliver bulky packages to each unit',
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block1',
        className: 'food_feature7-block',
        children: {
          className: 'food_feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'food_feature7-block-image',
              children:
                'https://bucket.mlcdn.com/a/1736/1736632/images/d0af21351103c9d30cb1cae9e2df29d7d1991761.png',
            },
            {
              name: 'title',
              className: 'food_feature7-block-title',
              children: '',
            },
            {
              name: 'content',
              className: 'food_feature7-block-content',
              children: 'No more leaving valuable packages at door front that may cause liability issues',
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block2',
        className: 'food_feature7-block',
        children: {
          className: 'food_feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'food_feature7-block-image',
              children:
                'https://bucket.mlcdn.com/a/1736/1736632/images/744ddaeba3f8316af168b5c10e3069fb6d894165.png',
            },
            {
              name: 'title',
              className: 'food_feature7-block-title',
              children: '',
            },
            {
              name: 'content',
              className: 'food_feature7-block-content',
              children: 'No more requesting signatures by property management',
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block3',
        className: 'food_feature7-block',
        children: {
          className: 'food_feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'food_feature7-block-image',
              children:
                'https://bucket.mlcdn.com/a/1736/1736632/images/25c4525e929c8e49c23bc982f4d3d7bcea94999c.png',
            },
            {
              name: 'title',
              className: 'food_feature7-block-title',
              children: '',
            },
            {
              name: 'content',
              className: 'food_feature7-block-content',
              children: 'No more climbing stairs and time wasted',
            },
          ],
        },
      },

    ],
  },
};

