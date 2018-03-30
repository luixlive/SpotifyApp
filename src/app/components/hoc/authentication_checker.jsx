import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { loadUser } from './../../actions/user';
import ScreenLoader from './../screen_loader';

export const getAuthenticationChecker = (ComposedComponent) => {
  class AuthenticationChecker extends Component {
    componentDidMount() {
      if (!this.props.userAuthenticated) {
        this.props.loadUser();
      }
    }

    render() {
      if (!this.props.userLoaded || this.props.loggingOutUser) {
        return <ScreenLoader />;
      } else if (!this.props.userAuthenticated) {
        return <Redirect to="/login" />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  AuthenticationChecker.propTypes = {
    userAuthenticated: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
    userLoaded: PropTypes.bool.isRequired,
    loggingOutUser: PropTypes.bool.isRequired,
  };

  return AuthenticationChecker;
};

export default (ComposedComponent) => {
  const mapDispatchToProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
  });

  const mapStateToProps = ({ user }) => ({
    userAuthenticated: user.userAuthenticated,
    userLoaded: user.userLoaded,
    loggingOutUser: user.loggingOutUser,
  });

  const connectedSizeDetector =
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(getAuthenticationChecker(ComposedComponent));

  return withRouter(connectedSizeDetector);
};
