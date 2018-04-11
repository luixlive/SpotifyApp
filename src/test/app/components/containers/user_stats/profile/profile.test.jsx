import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import initialState from './../../../../../test_utils/initial_state';
import Profile
  from './../../../../../../app/components/containers/user_stats/profile';

describe('App Components - Profile', () => {
  it('renders', () => {
    const mockStore = configureStore();
    const store = mockStore(_.merge({}, initialState, {
      user: { profile: { images: [{ url: 'url' }] } },
    }));
    const rendered = renderer.create((
      <Provider store={store}>
        <Profile />
      </Provider>
    )).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
