import React from 'react';

export const Banner01DataSource = {
  wrapper: { className: 'home_banner0' },
  textWrapper: { className: 'home_banner0-text-wrapper' },
  title: {
    className: 'home_banner0-title',
    children: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
  },
  content: {
    className: 'home_banner0-content',
    children: '一个高效的页面动画解决方案',
  },
  button: { className: 'home_banner0-button', children: 'Learn More' },
};

export const Banner10DataSource = {
  wrapper: { className: 'home_banner1' },
  BannerAnim: {
    children: [
      {
        name: 'elem0',
        BannerElement: { className: 'banner-user-elem' },
        textWrapper: { className: 'home_banner1-text-wrapper' },
        bg: { className: 'bg bg0' },
        title: {
          className: 'home_banner1-title',
          children:
            'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/zicodexpress%20Logo%402x.png',
        },
        content: {
          className: 'home_banner1-content',
          children: 'A Smart Locker Expert',
        },
        button: { className: 'home_banner1-button', children: 'Learn More', href:"#Content3_0" },
      },
      {
        name: 'elem1',
        BannerElement: { className: 'banner-user-elem' },
        textWrapper: { className: 'home_banner1-text-wrapper' },
        bg: { className: 'bg2 bg1' },
        title: {
          className: 'home_banner1-title',
          children:
            'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/zicodexpress%20Logo%402x.png',
        },
        content: {
          className: 'home_banner1-content',
          children: 'A Smart Locker Expert',
        },
        button: { className: 'home_banner1-button', children: 'Learn More',href:"#Content3_0" },
      },
      {
        name: 'elem2',
        BannerElement: { className: 'banner-user-elem' },
        textWrapper: { className: 'home_banner1-text-wrapper' },
        bg: { className: 'bg bg1 kpzv3fnn03h-editor_css' },
        title: {
          className: 'home_banner1-title',
          children:
            'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/zicodexpress%20Logo%402x.png',
        },
        content: {
          className: 'home_banner1-content',
          children: 'A Smart Locker Expert',
        },
        button: { className: 'home_banner1-button', children: 'Learn More',href:"#Content3_0" },
      },
    ],
  },
};
export const Banner30DataSource = {
  wrapper: { className: 'home_banner3' },
  textWrapper: {
    className: 'home_banner3-text-wrapper',
    children: [
      {
        name: 'nameEn',
        className: 'home_banner3-name-en',
        children: 'Seeking Great Experience With ZipcodeXpress ',
      },
      {
        name: 'slogan',
        className: 'home_banner3-slogan',
        children: '"The App is just amazing! I scan that QR code every time I come to pick up my packages. See today I got two packages within 1 second."',
        texty: true,
      },
      {
        name: 'name',
        className: 'home_banner3-name',
        children: 'John, user of Zippora Package Smart Locker 10006',
      },
      // { name: 'button', className: 'home_banner3-button', children: '立即报名' },
      {
        name: 'time',
        className: 'home_banner3-time',
        children: '2019.01.06 / Austin TX',
      },
    ],
  },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper home_content0-wrapper' },
  page: { className: 'home-page home_content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: 'Zippora Packge Smart Lockers' }],
  },
  childWrapper: {
    className: 'home_content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'home_content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'home_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'home_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/%E7%BB%84%202%402x%2814%29.png',
            },
            {
              name: 'title',
              className: 'home_content0-block-title',
              children: 'Apartment/Condo',
            },
            { name: 'home_content',
			className: 'home_content0-block-content',
			 children: 'As a property manager, do you feel your precious time is wasted everyday to sign and manage packages? As a resident, have you ever lost your packages or unable to retrieve them after office hours? Zippora is here to solve all the problems!' },
          ],
        },
      },
      {
        name: 'block1',
        className: 'home_content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'home_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'home_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/%E7%BB%84%202%402x%2813%29.png',
            },
            {
              name: 'title',
              className: 'home_content0-block-title',
              children: 'Office Center',
            },
            {
              name: 'home_content',
			  className: 'home_content0-block-content',
              children: 'As a property manager, do you feel the property is not secured when carriers visit offices to deliver packages? As an employee, are you concerned about your privacy when colleagues sign packages for you? Zippora is here to solve all the problems!',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'home_content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'home_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'home_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/%E7%BB%84%202%402x%2812%29.png',
            },
            {
              name: 'title',
              className: 'home_content0-block-title',
              children: 'School Campus',
            },
            {
              name: 'home_content',
			  className: 'home_content0-block-content',
              children: 'As a school faculty, do you feel tedious to handle tons of packages every day for all the teachers and students? As a student, do you often have food delivered to campus yet you are right in the middle of a class? Zippora is here to solve all the problems!',
            },
          ],
        },
      },
	  {
        name: 'block3',
        className: 'home_content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'home_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'home_content0-block-icon',
              children:
                'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/home/%E7%BB%84%202%402x%2811%29.png',
            },
            {
              name: 'title',
              className: 'home_content0-block-title',
              children: 'Grocery Store',
            },
            {
              name: 'home_content',
			  className: 'home_content0-block-content',
              children: 'As a store manager, don’t you think you are spending too much time on helping customers to pickup their groceries? As a grocery shopper, do you feel you have wasted too much time on pushing a shopping cart around and waiting to pay? Zippora is here to solve all the problems!',
            },
          ],
        },
      },
    ],
  },
};
export const Content50DataSource = {
  wrapper: { className: 'home-page-wrapper home_content5-wrapper' },
  page: { className: 'home-page home_content5' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      { name: 'title', children: 'A Few of Our Customers', className: 'title-h1' },
      {
        name: 'home_content',
        className: 'title-content',
        children: '',
      },
    ],
  },
  block: {
    className: 'home_content5-img-wrapper',
    gutter: 3,
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/7f314e0531d3ed5386b5184217d82ba17ed91b6e.jpeg',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/e940c26285a27466e28346536f449ab7e3ac7fe0.jpeg',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/f1a2e98f7bf3d0fc10ee7e3a97ffaf371f598c81.png',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block3',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/0e09aa0ac831919e07724908f64a84bb775415f5.png',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block4',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/d3526f211c1f547428e08f6acb7aaf4ac61006b3.png',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block5',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/eed34e7b9e4293f101ab15aafd444b8eae672c88.jpeg',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block6',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/f6f1ab942a4558a92a0ec10626a9a743fcf38549.jpeg',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block7',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/873e322d5b1f29ec44e88acc42c1b1a5588f6e2a.jpeg',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block8',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'home_content5-block-content' },
          img: {
            children:
              'https://bucket.mlcdn.com/a/1736/1736632/images/55f3563ad29dff0074d0e0daf49acb4fd67c9e67.png',
          },
          content: { children: '' },
        },
      },
    ],
  },
};
export const Content30DataSource = {
  wrapper: { className: 'home-page-wrapper home_content3-wrapper' },
  page: { className: 'home-page home_content3' },
  OverPack: { playScale: 0.3 },
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
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'home_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
          },
          textWrapper: { className: 'home_content3-text' },
          title: { className: 'home_content3-title', children: 'Cell Phone App' },
          content: {
            className: 'home_content3-content',
            children:
              'Android and iOS cell phone both available, very user friendly. Property management is able to post notification and ads via this amazing App. Download to know more.',
          },
        },
      },
      {
        name: 'block1',
        className: 'home_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'home_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          },
          textWrapper: { className: 'home_content3-text' },
          title: { className: 'home_content3-title', children: 'IC Card Reader' },
          content: {
            className: 'home_content3-content',
            children:
              'Property managers scan IC card to log in to manage all parcel lockers at the touchscreen. We also provide a Locker Admin code for managers. Locker management becomes easy.',
          },
        },
      },
      {
        name: 'block2',
        className: 'home_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'home_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
          },
          textWrapper: { className: 'home_content3-text' },
          title: { className: 'home_content3-title', children: 'QR Scanner' },
          content: {
            className: 'home_content3-content',
            children:
              'ZipcodeXpress is the first and only package locker company to provide such cool and fun feature. Recipients can simply retrieve packages by scanning QR code via cell phone App.',
          },
        },
      },
      {
        name: 'block3',
        className: 'home_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'home_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
          },
          textWrapper: { className: 'home_content3-text' },
          title: { className: 'home_content3-title', children: 'Access Code Login' },
          content: {
            className: 'home_content3-content',
            children:
              'You can either scan the QR code or input access code to login. The access code will be sent to you 3 WAYS via email, text messaging and your cell phone App. No notification delay at all.',
          },
        },
      },
      {
        name: 'block4',
        className: 'home_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'home_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
          },
          textWrapper: { className: 'home_content3-text' },
          title: { className: 'home_content3-title', children: 'Various Locker Sizes' },
          content: {
            className: 'home_content3-content',
            children:
              '6 lockers opening sizes including S, M, L, XL, XXL and oversize. No matter irregular shaped packages or oversized packages, our locker can "swallow" them all! Plus we can always add an add-on unit per your request!',
          },
        },
      },
      {
        name: 'block5',
        className: 'home_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'home_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
          },
          textWrapper: { className: 'home_content3-text' },
          title: { className: 'home_content3-title', children: 'Video Surveillance Camera' },
          content: {
            className: 'home_content3-content',
            children:
              '24/7 security surveillance camera. High definition motion captured videos with both audio and picture. Provides 48 hours play-back. Cell phone App live surveillance available.',
          },
        },
      },
    ],
  },
};
export const Feature10DataSource = {
  wrapper: { className: 'home-page-wrapper home_content1-wrapper' },
  OverPack: { className: 'home-page home_content1', playScale: 0.3 },
  imgWrapper: { className: 'home_content1-img', md: 12, xs: 24 },
  img: {
    href: "https://youtu.be/tk-2K3g17vU",
    children: 'https://bucket.mlcdn.com/a/1736/1736632/images/c5222785e1d5e0c487c46936ccf78a3bf3f564f4.jpeg',
   
  },
  textWrapper: { className: 'home_content1-text', md: 12, xs: 24 },
  title: { className: 'home_content1-title', children: 'In Case You Have Not Seen This' },
  content: {
    className: 'home_content1-content',
    children:
      'See how our package locker will benefit you!',
  },
};
export const Feature20DataSource = {
  wrapper: { className: 'home-page-wrapper home_content2-wrapper' },
  OverPack: { className: 'home-page home_content2', playScale: 0.3 },
  imgWrapper: { className: 'home_content2-img', md: 10, xs: 24 },
  img: {
    children: 'https://zos.alipayobjects.com/rmsportal/tvQTfCupGUFKSfQ.png',
  },
  textWrapper: { className: 'home_content2-text', md: 14, xs: 24 },
  title: { className: 'home_content2-title', children: '分布式中间件' },
  content: {
    className: 'home_content2-content',
    children:
      '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。',
  },
};
export const Banner50DataSource = {
  wrapper: { className: 'home-page-wrapper home_banner5' },
  page: { className: 'home-page home_banner5-page' },
  childWrapper: {
    className: 'home_banner5-title-wrapper',
    children: [
      { name: 'title', children: '产品名', className: 'home_banner5-title' },
      {
        name: 'explain',
        className: 'home_banner5-explain',
        children: '产品标语介绍',
      },
      {
        name: 'home_content',
        className: 'home_banner5-content',
        children: '产品的详细说明，如是什么东西之类的文字',
      },
      {
        name: 'button',
        className: 'home_banner5-button-wrapper',
        children: {
          href: '#',
          className: 'home_banner5-button',
          type: 'primary',
          children: '开始使用',
        },
      },
    ],
  },
  image: {
    className: 'home_banner5-image',
    children:
      'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-wAhRYnWQscAAAAAAAAAAABkARQnAQ',
  },
};
export const Footer11DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children:
            'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'home_content0',
              children: 'Animation specification and components of Ant Design.',
            },
          ],
        },
      },
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '产品' },
        childWrapper: {
          children: [
            { name: 'link0', href: '#', children: '产品更新记录' },
            { name: 'link1', href: '#', children: 'API文档' },
            { name: 'link2', href: '#', children: '快速入门' },
            { name: 'link3', href: '#', children: '参考指南' },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '关于' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'FAQ' },
            { href: '#', name: 'link1', children: '联系我们' },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '资源' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Ant Design' },
            { href: '#', name: 'link1', children: 'Ant Motion' },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        ©2018 by <a href="https://motion.ant.design">Ant Motion</a> All Rights
        Reserved
      </span>
    ),
  },
};
