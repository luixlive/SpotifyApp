import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import { App, Login, UserStats } from './containers';
import { AuthenticationChecker } from './hoc';
import { NotFound } from './';

export default () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={AuthenticationChecker(UserStats)} />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </App>
  </BrowserRouter>
);
