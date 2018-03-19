import PropTypes from 'prop-types';
import React from 'react';

import { AppFooter } from './';
import { AppHeaderContainer } from './containers';
import { SizeDetector } from './hoc';

const App = props => (
  <div>
    <AppHeaderContainer />
    {props.children}
    <AppFooter />
  </div>
);

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default SizeDetector(App);
