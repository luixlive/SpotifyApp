import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { logoutUser } from './../../actions/user';

export const AppHeader = (props) => {
  const getLoginButtonText = () => {
    if (props.userAuthenticated) {
      return 'Logout';
    }
    return props.deviceMobile ? 'Log in' : 'Log in with Spotify';
  };

  return (
    <Segment color="green" textAlign="center">
      <Grid columns={3}>
        <Grid.Column />
        <Grid.Column verticalAlign="middle">
          <Header as={props.deviceMobile ? 'h3' : 'h2'} >
            Spotify Stats
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Button
            inverted
            color="green"
            floated="right"
            onClick={() => {
              if (props.userAuthenticated) {
                props.logoutUser();
              } else {
                window.open('/api/authentication/spotify', '_self');
              }
            }}
          >
            {getLoginButtonText()}
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

AppHeader.propTypes = {
  deviceMobile: PropTypes.bool.isRequired,
  userAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ deviceMobile, user }) => ({
  deviceMobile,
  userAuthenticated: user.userAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export const ConnectedAppHeader =
  connect(mapStateToProps, mapDispatchToProps)(AppHeader);

export default withRouter(ConnectedAppHeader);
