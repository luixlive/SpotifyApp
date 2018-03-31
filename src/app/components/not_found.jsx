import React from 'react';
import { Link } from 'react-router-dom';

import MessageTemplate from './templates';

export const NotFound = () => (
  <MessageTemplate title="Error 404">
    Page not found, go back to <Link to="/">home</Link> page.
  </MessageTemplate>
);

export default NotFound;
