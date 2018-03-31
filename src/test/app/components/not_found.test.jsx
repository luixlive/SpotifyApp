import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import initialState from './../../test_utils/initial_state';
import injectRouter from './../../test_utils/inject_router';
import { NotFound } from './../../../app/components';

describe('App Components - NotFound', () => {
  it('renders', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const rendered = renderer.create(injectRouter(() => (
      <Provider store={store}>
        <NotFound />
      </Provider>
    ))).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
