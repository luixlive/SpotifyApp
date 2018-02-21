import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import AppConnected from './app';
import LoginConnected from './login';
import UserStats from './user_stats';

export default () => (
  <BrowserRouter>
    <AppConnected>
      <Route exact path="/" component={LoginConnected} />
      <Route path="/stats" component={UserStats} />
    </AppConnected>
  </BrowserRouter>
);
