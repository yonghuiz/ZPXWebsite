/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Image } from 'antd';
import { enquireScreen } from 'enquire-js';
import Banner0 from './Banner0';
import Banner4 from './Banner4';
import Content0 from './Content0';
import Content1 from './Content1';
import Content3 from './Content3';
import Feature7 from './Feature7';

import {
  // Nav00DataSource,
  Banner00DataSource,
  Banner40DataSource,
  Content00DataSource,
  Content10DataSource,
  Content30DataSource,
  Feature70DataSource,
} from './data.source';
import './less/school.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

export default class Apartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center",
      textAlignVertical: 'bottom'
    };
    const mystyle1 = {

      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center",
      textAlignVertical: 'bottom'
    };
    const children = [
      <Banner0
        id="Banner0_0"
        key="Banner0_0"
        dataSource={Banner00DataSource}
        isMobile={this.state.isMobile}
      />,

      <Content1
        id="Content1_0"
        key="Content1_0"
        dataSource={Content10DataSource}
        isMobile={this.state.isMobile}
      />,
      <div>
        <span>
          <h1 style={mystyle}>How do we resolve</h1>,

          <br />
          <p style={mystyle1}>ZipcodeXpress Food Locker provides you the right solution! From now on, your food can be delivered and storied at our food locker with the right temperature for your food safety.</p>
          <br />
        </span>,
      </div>,
      <div class="img_container">
        {/* <Image.PreviewGroup> */}
          <Image
            width={400}
            src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/Food%20Service_slices/pic2%402x.png"
          />
          <Image
            width={50}
          
          />
          <Image
            width={400}
            src="https://unibox-us.oss-us-east-1.aliyuncs.com/Website_Image/Food%20Service_slices/pic3%402x.png"
          />
        {/* </Image.PreviewGroup> */}
      </div>,
     
     <Content0
     id="Content0_0"
     key="Content0_0"
     dataSource={Content00DataSource}
     isMobile={this.state.isMobile}
   />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}

      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }
}
