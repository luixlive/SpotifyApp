import React, { Component } from 'react';

import isDeviceMobile from './../../util/is_device_mobile';

export default (ComposedComponent) => {
  class SizeDetector extends Component {
    constructor(props) {
      super(props);

      this.state = { isDeviceMobile: isDeviceMobile(window.innerWidth) };
    }

    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.setState({ isDeviceMobile: isDeviceMobile(window.innerWidth) });
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          isDeviceMobile={this.state.isDeviceMobile}
        />
      );
    }
  }

  return SizeDetector;
};
