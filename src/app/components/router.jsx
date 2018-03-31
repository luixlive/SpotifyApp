import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import {
  AppContainer,
  LoginContainer,
  UserStatsContainer,
} from './containers';
import { AuthenticationChecker } from './hoc';
import { AppNotFound } from './';

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
        <Route path="*" component={AppNotFound} />
      </Switch>
    </AppContainer>
  </BrowserRouter>
);
