import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from './components';
import reducers from './reducers';
import './style/semantic.less';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={createStoreWithMiddleware(reducers)}>
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
