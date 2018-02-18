import PropTypes from 'prop-types';
import React from 'react';

import Header from './header';
import Footer from './footer';

const App = props => (
  <div>
    <Header isUserAuthenticated={false} />
    {props.children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default App;
