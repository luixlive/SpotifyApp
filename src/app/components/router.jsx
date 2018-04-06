import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import React from 'react';

import { App, Login, UserStats } from './containers';
import { AuthenticationChecker } from './hoc';
import Message from './templates';

export const NotFound = () => (
  <Message title="Error 404">
    Page not found. Go back to <Link to="/">home</Link> page.
  </Message>
);

export default hot(module)(() => (
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
));
