import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from './components';
import combinedReducers from './reducers';
import rootSaga from './sagas';
import './style/semantic.less';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combinedReducers,
  undefined,
  compose(
    applyMiddleware(sagaMiddleware),
    ...(process.env !== 'production' ? [
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ] : []),
  ),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>
  , document.querySelector('.app'),
);
