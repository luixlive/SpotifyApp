import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
      </Provider>
    </AppContainer>
    , document.querySelector('.app'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/app', () => {
    render();
  });
}
