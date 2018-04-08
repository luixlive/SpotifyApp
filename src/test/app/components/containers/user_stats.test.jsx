import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import UserStats, {
  PureUserStats,
} from './../../../../app/components/containers/user_stats';
import initialState from './../../../test_utils/initial_state';
import * as types from './../../../../app/actions/types';
import {
  userStats as componentProps,
} from './../../../test_utils/components_props';

describe('App Components - UserStats', () => {
  describe('Snapshots', () => {
    let props;
    beforeAll(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders stats not loaded', () => {
      const rendered = renderer.create(<PureUserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders stats loaded', () => {
      props.statsLoaded = true;
      const rendered = renderer.create(<PureUserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('calls loadUserStats when componentDidMount', () => {
      const loadUserStats = jest.fn();
      const props = _.cloneDeep(componentProps);
      mount(<PureUserStats {...props} loadUserStats={loadUserStats} />);
      expect(loadUserStats).toHaveBeenCalledTimes(1);
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount((
        <Provider store={store}>
          <UserStats />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureUserStats).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureUserStats).props()))
        .toEqual(Object.keys(componentProps));
    });

    it('dispatches loadUserStats', () => {
      const expectedAction = {
        type: types.LOAD_USER_STATS,
        payload: {},
      };
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});
