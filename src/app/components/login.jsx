import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const AppHeader = () => (
  <Container className="" textAlign="center">
    <Header
      as="h1"
      style={{ fontSize: '4em', marginTop: '1.5em' }}
    >
    Welcome
    </Header>
    <Header as="h2">Please sign in with Spotify to start.</Header>
  </Container>
);

export default AppHeader;
