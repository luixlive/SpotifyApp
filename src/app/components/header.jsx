import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

const AppHeader = (props) => {
  const getLoginButtonText = () => {
    if (props.isUserAuthenticated) {
      return 'Logout';
    }
    return props.isDeviceMobile ? 'Sign in' : 'Sign in with Spotify';
  };

  return (
    <Segment color="green" textAlign="center">
      <Grid columns={3}>
        <Grid.Column />
        <Grid.Column verticalAlign="middle">
          <Header
            as={props.isDeviceMobile ? 'h3' : 'h2'}
          >
            Spotify Stats
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Button
            inverted
            color="green"
            floated="right"
            onClick={() => {
              if (props.isUserAuthenticated) {

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
  isDeviceMobile: PropTypes.bool.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isDeviceMobile }) => ({ isDeviceMobile });

export default connect(mapStateToProps)(AppHeader);
