import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from './components';
import reducers from './reducers';
import rootSaga from './sagas';
import './style/semantic.less';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

sagaMiddleware.run(rootSaga);

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
