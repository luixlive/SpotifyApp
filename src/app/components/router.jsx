import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import { AppConnected } from './';
import { LoginConnected, UserStatsConnected } from './containers';

export default () => (
  <BrowserRouter>
    <AppConnected>
      <Route exact path="/" component={LoginConnected} />
      <Route path="/stats" component={UserStatsConnected} />
    </AppConnected>
  </BrowserRouter>
);
