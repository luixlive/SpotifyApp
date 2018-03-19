import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import toJson from 'enzyme-to-json';

import AppComponent from './../../../app/components/app';
import initialState from './../../test_utils/initial_state';

describe('App Components - App', () => {
  it('renders', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const props = { children: [<div key="0" />] };
    const wrapper = mount((
      <MemoryRouter
        initialEntries={[{ pathname: '/', key: 'key' }]}
        initialIndex={0}
      >
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>
      </MemoryRouter>
    ));
    expect(toJson(wrapper.find('App'))).toMatchSnapshot();
  });
});
