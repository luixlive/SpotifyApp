import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import AppConnected from './app';
import Login from './login';
import UserStats from './user_stats';

export default () => (
  <BrowserRouter>
    <AppConnected>
      <Route exact path="/" component={Login} />
      <Route path="/stats" component={UserStats} />
    </AppConnected>
  </BrowserRouter>
);
