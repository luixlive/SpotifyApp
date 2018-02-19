import { AppContainer } from 'react-hot-loader';
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from './components';
import reducers from './reducers';
import './style/semantic.less';

const store = createStore(
  reducers,
  undefined,
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f),
);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router />
      </Provider>
    </AppContainer>
    , document.querySelector('.app'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/router', () => {
    render();
  });
}
