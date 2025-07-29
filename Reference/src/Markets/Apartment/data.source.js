import React from 'react';

export const Banner00DataSource = {
  wrapper: { className: 'apt_banner0' },
  textWrapper: { className: 'apt_banner0-text-wrapper' },
  title: {
    className: 'apt_banner0-title',
    children: '',
  },
  content: {
    className: 'apt_banner0-content',
    children: '',
  },
   button: { className: 'banner0-button', children: 'Learn More' },
};
export const Banner40DataSource = {
  wrapper: { className: 'home-page-wrapper apt_banner4' },
  page: { className: 'home-page apt_banner4-page' },
  childWrapper: {
    className: 'apt_banner4-title-wrapper',
    children: [
      { name: 'title', children: 'How do we resolve', className: 'apt_banner4-title' },
      {
        name: 'content',
        className: 'apt_banner4-content',
        children: 'Packages are dropped off in designated lockers Residents don’t have to wait at home anymore Residents are notified upon their packages’ arrival Residents pick up their packages 24/7',
      },
      {
        name: 'button',
        children: { href: '#', type: 'primary', children: '' },
      },
    ],
  },
  image: {
    className: 'apt_banner4-image',
    children:
      'https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/apartment/pic2_apartment.png',
  },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper apt_content0-wrapper' },
  page: { className: 'home-page apt_content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: '产品与服务' }],
  },
  childWrapper: {
    className: 'apt_content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'apt_content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'apt_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'apt_content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
            },
            {
              name: 'title',
              className: 'apt_content0-block-title',
              children: '一站式业务接入',
            },
            { name: 'content', children: '支付、结算、核算接入产品效率翻四倍' },
          ],
        },
      },
      {
        name: 'block1',
        className: 'apt_content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'apt_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'apt_content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
            },
            {
              name: 'title',
              className: 'apt_content0-block-title',
              children: '一站式事中风险监控',
            },
            {
              name: 'content',
              children: '在所有需求配置环节事前风险控制和质量控制能力',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'apt_content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'apt_content0-block-item',
          children: [
            {
              name: 'image',
              className: 'apt_content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
            },
            {
              name: 'title',
              className: 'apt_content0-block-title',
              children: '一站式数据运营',
            },
            {
              name: 'content',
              children: '沉淀产品接入效率和运营小二工作效率数据',
            },
          ],
        },
      },
    ],
  },
};
export const Content10DataSource = {
  wrapper: { className: 'home-page-wrapper apt_content1-wrapper' },
  OverPack: { className: 'home-page apt_content1', playScale: 0.3 },
  imgWrapper: { className: 'apt_content1-img', md: 10, xs: 24 },
  img: {
    children: 'https://bucket.mlcdn.com/a/1736/1736632/images/cda2457e21ae0a03934d92d78bfde63eb7fd55a1.png',
  },
  textWrapper: { className: 'apt_content1-text', md: 14, xs: 24 },
  title: { className: 'apt_content1-title', children: 'Current Problems' },
  content: {
    className: 'apt_content1-content',
    children:
      'AS A RESIDENT, have you ever missed out on special events waiting for your package because it’s never delivered on time? Have you ever run to management office after work to retrieve your package yet it’s already closed? Have you ever lost your packages because carrier carelessly left them at your door front? AS A PROPERTY MANAGER, are you tried of constantly signing packages for your tenants? Are you done with tenants complaining about their lost packages? Are you not happy about packages pile up in your storage room',
  },
};
export const Content30DataSource = {
  wrapper: { className: 'home-page-wrapper apt_content3-wrapper' },
  page: { className: 'home-page apt_content3' },
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
    className: 'apt_content3-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'apt_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'apt_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
          },
          textWrapper: { className: 'apt_content3-text' },
          title: { className: 'apt_content3-title', children: '企业资源管理' },
          content: {
            className: 'apt_content3-content',
            children:
              '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。',
          },
        },
      },
      {
        name: 'block1',
        className: 'apt_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'apt_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          },
          textWrapper: { className: 'apt_content3-text' },
          title: { className: 'apt_content3-title', children: '云安全' },
          content: {
            className: 'apt_content3-content',
            children:
              '按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。',
          },
        },
      },
      {
        name: 'block2',
        className: 'apt_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'apt_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
          },
          textWrapper: { className: 'apt_content3-text' },
          title: { className: 'apt_content3-title', children: '云监控' },
          content: {
            className: 'apt_content3-content',
            children:
              '分布式云环境集中监控，统一资源及应用状态视图，智能分析及故障定位。',
          },
        },
      },
      {
        name: 'block3',
        className: 'apt_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'apt_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
          },
          textWrapper: { className: 'apt_content3-text' },
          title: { className: 'apt_content3-title', children: '移动' },
          content: {
            className: 'apt_content3-content',
            children:
              '一站式移动金融APP开发及全面监控；丰富可用组件，动态发布和故障热修复。',
          },
        },
      },
      {
        name: 'block4',
        className: 'apt_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'apt_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
          },
          textWrapper: { className: 'apt_content3-text' },
          title: { className: 'apt_content3-title', children: '分布式中间件' },
          content: {
            className: 'apt_content3-content',
            children:
              '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。',
          },
        },
      },
      {
        name: 'block5',
        className: 'apt_content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'apt_content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
          },
          textWrapper: { className: 'apt_content3-text' },
          title: { className: 'apt_content3-title', children: '大数据' },
          content: {
            className: 'apt_content3-content',
            children:
              '一站式、全周期大数据协同工作平台，PB级数据处理、毫秒级数据分析工具。',
          },
        },
      },
    ],
  },
};
export const Feature70DataSource = {
  wrapper: { className: 'home-page-wrapper apt_feature7-wrapper' },
  page: { className: 'home-page apt_feature7' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'apt_feature7-title-wrapper',
    children: [
      {
        name: 'title',
        className: 'apt_feature7-title-h1',
        children: 'With our smart lockers...',
      },
      {
        name: 'content',
        className: 'apt_feature7-title-content',
        children: 'You can take easy now',
      },
    ],
  },
  blockWrapper: {
    className: 'apt_feature7-block-wrapper',
    gutter: 24,
    children: [
      {
        md: 6,
        xs: 24,
        name: 'block0',
        className: 'apt_feature7-block',
        children: {
          className: 'apt_feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'apt_feature7-block-image',
              children:
                'https://bucket.mlcdn.com/a/1736/1736632/images/acfe55401bfc35949aaa9b49ac9b3fb6ec4a1df7.png',
            },
            {
              name: 'title',
              className: 'apt_feature7-block-title',
              children: '',
            },
            {
              name: 'content',
              className: 'apt_feature7-block-content',
              children: 'No more multiple attempts to deliver bulky packages to each unit',
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block1',
        className: 'apt_feature7-block',
        children: {
          className: 'apt_feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'apt_feature7-block-image',
              children:
                'https://bucket.mlcdn.com/a/1736/1736632/images/d0af21351103c9d30cb1cae9e2df29d7d1991761.png',
            },
            {
              name: 'title',
              className: 'apt_feature7-block-title',
              children: '',
            },
            {
              name: 'content',
              className: 'apt_feature7-block-content',
              children: 'No more leaving valuable packages at door front that may cause liability issues',
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block2',
        className: 'apt_feature7-block',
        children: {
          className: 'apt_feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'apt_feature7-block-image',
              children:
                'https://bucket.mlcdn.com/a/1736/1736632/images/744ddaeba3f8316af168b5c10e3069fb6d894165.png',
            },
            {
              name: 'title',
              className: 'apt_feature7-block-title',
              children: '',
            },
            {
              name: 'content',
              className: 'apt_feature7-block-content',
              children: 'No more requesting signatures by property management',
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block3',
        className: 'apt_feature7-block',
        children: {
          className: 'apt_feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'apt_feature7-block-image',
              children:
                'https://bucket.mlcdn.com/a/1736/1736632/images/25c4525e929c8e49c23bc982f4d3d7bcea94999c.png',
            },
            {
              name: 'title',
              className: 'apt_feature7-block-title',
              children: '',
            },
            {
              name: 'content',
              className: 'apt_feature7-block-content',
              children: 'No more climbing stairs and time wasted',
            },
          ],
        },
      },
      
    ],
  },
};

