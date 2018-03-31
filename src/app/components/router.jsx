import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import React from 'react';

import { App, Login, UserStats } from './containers';
import { AuthenticationChecker } from './hoc';
import Message from './templates';

export const NotFound = () => (
  <Message title="Error 404">
    Page not found, go back to <Link to="/">home</Link> page.
  </Message>
);

export default () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={AuthenticationChecker(UserStats)} />
        <Route exact path="/login" component={Login} />
        <Route
          path="*"
          component={NotFound}
        />
      </Switch>
    </App>
  </BrowserRouter>
);
