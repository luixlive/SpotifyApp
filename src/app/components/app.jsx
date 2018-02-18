import PropTypes from 'prop-types';
import React from 'react';

import Header from './header';
import Footer from './footer';

const App = props => (
  <div>
    <Header />
    {props.children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
