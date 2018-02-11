import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import App from './app';
import UserStats from './user_stats';

export default () => (
  <BrowserRouter>
    <App>
      <Route path="/stats" component={UserStats} />
    </App>
  </BrowserRouter>
);
