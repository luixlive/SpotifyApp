import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

export const Login = (props) => {
  if (props.userAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Container className="" textAlign="center">
      <Header
        as="h1"
        style={{
          fontSize: props.deviceMobile ? '2em' : '4em',
          marginTop: props.deviceMobile ? '1em' : '1.5em',
        }}
      >
      Welcome
      </Header>
      <Header as={props.deviceMobile ? 'h3' : 'h2'} >
        Please log in with Spotify to start.
      </Header>
    </Container>
  );
};

Login.propTypes = {
  deviceMobile: PropTypes.bool.isRequired,
  userAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ deviceMobile, user }) => ({
  deviceMobile,
  userAuthenticated: user.userAuthenticated,
});

const mapDispatchToProps = () => ({});

export const ConnectedLogin =
  connect(mapStateToProps, mapDispatchToProps)(Login);

export default withRouter(ConnectedLogin);
