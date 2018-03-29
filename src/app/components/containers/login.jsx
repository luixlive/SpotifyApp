import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

export const Login = props => (
  <Container className="" textAlign="center">
    <Header
      as="h1"
      style={{
        fontSize: props.isDeviceMobile ? '2em' : '4em',
        marginTop: props.isDeviceMobile ? '1em' : '1.5em',
      }}
    >
    Welcome
    </Header>
    <Header
      as={props.isDeviceMobile ? 'h3' : 'h2'}
    >
      Please log in with Spotify to start.
    </Header>
  </Container>
);

Login.propTypes = {
  isDeviceMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isDeviceMobile }) => ({ isDeviceMobile });

const mapDispatchToProps = () => ({});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default withRouter(ConnectedLogin);
