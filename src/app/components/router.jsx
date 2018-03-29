import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import { AppComponent, AppNotFound } from './';
import { AuthenticationChecker } from './hoc';
import { LoginContainer, UserStatsContainer } from './containers';

export default () => (
  <BrowserRouter>
    <AppComponent>
      <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route
          exact
          path="/stats"
          component={AuthenticationChecker(UserStatsContainer)}
        />
        <Route path="*" component={AppNotFound} />
      </Switch>
    </AppComponent>
  </BrowserRouter>
);
