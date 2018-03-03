import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import deviceTypeChanged from './../../actions/device';
import isDeviceMobile from './../../util/is_device_mobile';

export const getSizeDetector = (ComposedComponent) => {
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

  return SizeDetector;
};

export default (ComposedComponent) => {
  const mapDispatchToProps = dispatch => ({
    deviceTypeChanged: isMobile => dispatch(deviceTypeChanged(isMobile)),
  });

  const connectedSizeDetector =
    connect(null, mapDispatchToProps)(getSizeDetector(ComposedComponent));

  return withRouter(connectedSizeDetector);
};
