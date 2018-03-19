import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import initialState from './../../test_utils/initial_state';
import { Router } from './../../../app/components';

describe('App Components - Router', () => {
  it('renders', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const rendered = renderer.create((
      <Provider store={store}>
        <Router />
      </Provider>
    )).toJSON;
    expect(rendered).toMatchSnapshot();
  });
});
