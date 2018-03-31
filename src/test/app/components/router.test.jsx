import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import initialState from './../../test_utils/initial_state';
import injectRouter from './../../test_utils/inject_router';
import Router, { NotFound } from './../../../app/components/router';

describe('App Components - Router', () => {
  const mockStore = configureStore();
  let store;
  beforeAll(() => {
    store = mockStore(initialState);
  });

  it('renders', () => {
    // Use mount instead of renderer because it shows all children routes
    const wrapper = mount((
      <Provider store={store}>
        <Router />
      </Provider>
    ));
    expect(toJson(wrapper.find(Router))).toMatchSnapshot();
  });

  describe('Not Found component', () => {
    it('renders', () => {
      const rendered = renderer.create(injectRouter(() => (
        <Provider store={store}>
          <NotFound />
        </Provider>
      ))).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
