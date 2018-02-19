import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import deviceTypeChanged from './../../actions/device';
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
      const isNewSizeMobile = isDeviceMobile(window.innerWidth);
      if (this.state.isDeviceMobile !== isNewSizeMobile) {
        this.setState({ isDeviceMobile: isNewSizeMobile });
        this.props.deviceTypeChanged(isNewSizeMobile);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  SizeDetector.propTypes = {
    deviceTypeChanged: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = dispatch => ({
    deviceTypeChanged: isMobile => dispatch(deviceTypeChanged(isMobile)),
  });

  return connect(null, mapDispatchToProps)(SizeDetector);
};
