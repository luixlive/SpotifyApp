import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  tracks as componentProps,
} from './../../../../../test_utils/components_props';
import initialState from './../../../../../test_utils/initial_state';
import Tracks
  from './../../../../../../app/components/containers/user_stats/tracks/tracks';

describe('App Components - Tracks', () => {
  describe('Snapshots', () => {
    it('renders', () => {
      const mockStore = configureStore();
      const props = _.cloneDeep(componentProps);
      const store = mockStore(initialState);
      const rendered = renderer.create((
        <Provider store={store}>
          <Tracks {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
