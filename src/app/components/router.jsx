import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import { AppComponent } from './';
import { LoginContainer, UserStatsContainer } from './containers';

export default () => (
  <BrowserRouter>
    <AppComponent>
      <Route exact path="/" component={LoginContainer} />
      <Route path="/stats" component={UserStatsContainer} />
    </AppComponent>
  </BrowserRouter>
);
