import PropTypes from 'prop-types';
import React from 'react';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';

const AppHeader = props => (
  <Segment color="green" textAlign="center">
    <Grid columns={3}>
      <Grid.Column />
      <Grid.Column>
        <Header as="h1">Spotify Stats</Header>
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
          {props.isUserAuthenticated ? 'Logout' : 'Sign in with Spotify'}
        </Button>
      </Grid.Column>
    </Grid>
  </Segment>
);

AppHeader.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
};

export default AppHeader;
