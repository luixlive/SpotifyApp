import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { loadUser } from './../../actions/user';
import ScreenLoader from './../screen_loader';

export const getAuthenticationChecker = (ComposedComponent) => {
  class AuthenticationChecker extends Component {
    componentDidMount() {
      this.props.loadUser();
    }

    render() {
      if (!this.props.loadUserFinished || this.props.loggingOutUser) {
        return <ScreenLoader />;
      } else if (!this.props.isUserAuthenticated) {
        return <Redirect to="/" />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  AuthenticationChecker.propTypes = {
    isUserAuthenticated: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadUserFinished: PropTypes.bool.isRequired,
    loggingOutUser: PropTypes.bool.isRequired,
  };

  return AuthenticationChecker;
};

export default (ComposedComponent) => {
  const mapDispatchToProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
  });

  const mapStateToProps = ({ user }) => ({
    isUserAuthenticated: user.isUserAuthenticated,
    loadUserFinished: user.loadUserFinished,
    loggingOutUser: user.loggingOutUser,
  });

  const connectedSizeDetector =
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(getAuthenticationChecker(ComposedComponent));

  return withRouter(connectedSizeDetector);
};
