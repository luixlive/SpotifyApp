import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import { AppComponent } from './';
import { AuthenticationChecker } from './hoc';
import {
  LoginContainer,
  UserStatsContainer,
  NotFoundContainer,
} from './containers';

export default () => (
  <BrowserRouter>
    <AppComponent>
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
    </AppComponent>
  </BrowserRouter>
);
