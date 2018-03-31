import React from 'react';
import { Link } from 'react-router-dom';

import Message from './templates';

const NotFound = () => (
  <Message title="Error 404">
    Page not found, go back to <Link to="/">home</Link> page.
  </Message>
);

export default NotFound;
