import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import toJson from 'enzyme-to-json';

import initialState from './../../test_utils/initial_state';
import { Router } from './../../../app/components';

describe('App Components - Router', () => {
  it('renders', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = mount((
      <Provider store={store}>
        <Router />
      </Provider>
    ));
    expect(toJson(wrapper.find(Router))).toMatchSnapshot();
  });
});
