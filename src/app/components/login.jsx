import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

const Login = props => (
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
      Please sign in with Spotify to start.
    </Header>
  </Container>
);

Login.propTypes = {
  isDeviceMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isDeviceMobile }) => ({ isDeviceMobile });

export default connect(mapStateToProps)(Login);
