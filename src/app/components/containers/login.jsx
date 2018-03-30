import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { loadUser } from './../../actions/user';
import ScreenLoader from './../screen_loader';

export class Login extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    if (!this.props.userLoaded) {
      return <ScreenLoader />;
    } else if (this.props.isUserAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Container className="" textAlign="center">
        <Header
          as="h1"
          style={{
            fontSize: this.props.isDeviceMobile ? '2em' : '4em',
            marginTop: this.props.isDeviceMobile ? '1em' : '1.5em',
          }}
        >
        Welcome
        </Header>
        <Header as={this.props.isDeviceMobile ? 'h3' : 'h2'} >
          Please log in with Spotify to start.
        </Header>
      </Container>
    );
  }
}

Login.propTypes = {
  isDeviceMobile: PropTypes.bool.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
  userLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isDeviceMobile, user }) => ({
  isDeviceMobile,
  isUserAuthenticated: user.isUserAuthenticated,
  userLoaded: user.userLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
});

export const ConnectedLogin =
  connect(mapStateToProps, mapDispatchToProps)(Login);

export default withRouter(ConnectedLogin);
