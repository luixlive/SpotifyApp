import PropTypes from 'prop-types';
import React from 'react';

import css from './../style/style.css';

const App = props => (
  <div className={css.app} >
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
