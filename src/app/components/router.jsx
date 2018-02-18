import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import App from './app';
import Login from './login';
import UserStats from './user_stats';

export default () => (
  <BrowserRouter>
    <App>
      <Route path="/" component={Login} />
      <Route path="/stats" component={UserStats} />
    </App>
  </BrowserRouter>
);
