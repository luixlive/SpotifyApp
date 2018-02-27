import PropTypes from 'prop-types';
import React from 'react';

import { AppFooter } from './';
import { AppHeaderConnected } from './containers';
import { SizeDetector } from './hoc';

export const App = props => (
  <div>
    <AppHeaderConnected />
    {props.children}
    <AppFooter />
  </div>
);

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default SizeDetector(App);
