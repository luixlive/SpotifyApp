import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import MessageTemplate from './../templates';

export const Login = (props) => {
  if (props.userAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <MessageTemplate title="Welcome">
      Please log in with Spotify to start.
    </MessageTemplate>
  );
};

Login.propTypes = { userAuthenticated: PropTypes.bool.isRequired };

const mapStateToProps = ({ user }) => ({
  userAuthenticated: user.userAuthenticated,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
