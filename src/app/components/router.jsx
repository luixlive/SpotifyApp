import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import { AuthenticationChecker } from './hoc';
import {
  AppContainer,
  LoginContainer,
  UserStatsContainer,
  NotFoundContainer,
} from './containers';

export default () => (
  <BrowserRouter>
    <AppContainer>
      <Switch>
        <Route
          exact
          path="/"
          component={AuthenticationChecker(UserStatsContainer)}
        />
        <Route
          exact
          path="/login"
          component={LoginContainer}
        />
        <Route path="*" component={NotFoundContainer} />
      </Switch>
    </AppContainer>
  </BrowserRouter>
);
