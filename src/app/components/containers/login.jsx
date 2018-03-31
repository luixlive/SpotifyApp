import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import Message from './../templates';

export const PureLogin = (props) => {
  if (props.userAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Message title="Welcome">
      Please log in with Spotify to start.
    </Message>
  );
};

PureLogin.propTypes = { userAuthenticated: PropTypes.bool.isRequired };

const mapStateToProps = ({ user }) => ({
  userAuthenticated: user.userAuthenticated,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PureLogin);
