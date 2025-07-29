import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import Header from './Nav3';
// import Footer from './Footer0';
import Footer from './Footer1';

import {
  Nav30DataSource,
  // Footer00DataSource,
  Footer10DataSource,
} from './data.source.js';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

// const { location } = window;
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }

  render() {
    return (
      <>
        <Header dataSource={Nav30DataSource} isMobile={this.state.isMobile} />
        {this.props.children}
        <Footer dataSource={Footer10DataSource} isMobile={this.state.isMobile} />
        {/* <Footer dataSource={Footer00DataSource} isMobile={this.state.isMobile} /> */}
      </>
    );
  }
}

export default Layout;
