import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { logoutUser } from './../../actions/user';

export class PureHeader extends Component {
  getLoginButtonText = () => {
    if (this.props.userAuthenticated) {
      return 'Logout';
    }
    return this.props.deviceMobile ? 'Log in' : 'Log in with Spotify';
  };

  render() {
    return (
      <Segment color="green" textAlign="center">
        <Grid columns={3}>
          <Grid.Column width={4} />
          <Grid.Column verticalAlign="middle" width={8}>
            <Header as={this.props.deviceMobile ? 'h2' : 'h1'} >
              Spotify Stats
            </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              inverted
              color="green"
              floated="right"
              onClick={() => {
                if (this.props.userAuthenticated) {
                  this.props.logoutUser();
                } else {
                  window.open('/api/authentication/spotify', '_self');
                }
              }}
            >
              {this.getLoginButtonText()}
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

PureHeader.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PureHeader);
