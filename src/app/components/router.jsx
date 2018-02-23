import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import {
  AppConnected,
  LoginConnected,
  UserStatsConnected,
} from './';

export default () => (
  <BrowserRouter>
    <AppConnected>
      <Route exact path="/" component={LoginConnected} />
      <Route path="/stats" component={UserStatsConnected} />
    </AppConnected>
  </BrowserRouter>
);
