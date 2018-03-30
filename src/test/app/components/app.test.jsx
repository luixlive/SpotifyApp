import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import toJson from 'enzyme-to-json';

import AppComponent from './../../../app/components/app';
import initialState from './../../test_utils/initial_state';
import injectRouter from './../../test_utils/inject_router';

describe('App Components - App', () => {
  it('renders', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const props = { children: <div key="0" /> };
    const wrapper = mount(injectRouter(
      () => <Provider store={store}><AppComponent {...props} /></Provider>,
      '/',
    ));
    expect(toJson(wrapper.find('App'))).toMatchSnapshot();
  });
});
