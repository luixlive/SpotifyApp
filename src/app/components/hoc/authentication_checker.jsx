import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import ScreenLoader from './../screen_loader';

export const getAuthenticationChecker = (ComposedComponent) => {
  const AuthenticationChecker = (props) => {
    if (props.loggingOutUser) {
      return <ScreenLoader />;
    } else if (!props.userAuthenticated) {
      return <Redirect to="/login" />;
    }
    return <ComposedComponent {...props} />;
  };

  AuthenticationChecker.propTypes = {
    userAuthenticated: PropTypes.bool.isRequired,
    loggingOutUser: PropTypes.bool.isRequired,
  };

  return AuthenticationChecker;
};

export default (ComposedComponent) => {
  const mapDispatchToProps = () => ({});

  const mapStateToProps = ({ user }) => ({
    userAuthenticated: user.userAuthenticated,
    loggingOutUser: user.loggingOutUser,
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(getAuthenticationChecker(ComposedComponent));
};
