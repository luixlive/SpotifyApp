import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import initialState from './../../../../test_utils/initial_state';
import {
  Artists,
  Profile,
  Tracks,
} from './../../../../../app/components/containers/user_stats';
import * as types from './../../../../../app/actions/types';
import UserStats, {
  PureUserStats,
} from './../../../../../app/components/containers/user_stats/user_stats';
import {
  userStats as componentProps,
} from './../../../../test_utils/components_props';

describe('App Components - UserStats', () => {
  describe('Snapshots', () => {
    const mockStore = configureStore();
    let props;
    let store;
    beforeAll(() => {
      props = _.cloneDeep(componentProps);
      store = mockStore(initialState);
    });

    it('renders stats not loaded', () => {
      const rendered = renderer.create(<PureUserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders stats loaded', () => {
      props.statsLoaded = true;
      const rendered = renderer.create((
        <Provider store={store}>
          <PureUserStats {...props} />
        </Provider>
      ));
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    let props;
    beforeAll(() => {
      props = _.cloneDeep(componentProps);
    });

    it('calls loadUserStats when componentDidMount', () => {
      const loadUserStats = jest.fn();
      mount(<PureUserStats {...props} loadUserStats={loadUserStats} />);
      expect(loadUserStats).toHaveBeenCalledTimes(1);
    });

    it('updates state.activeMenuItem when clicking menu items', () => {
      props.statsLoaded = true;
      const wrapper = shallow(<PureUserStats {...props} />);
      expect(wrapper.state().activeMenuItem).toBe(PureUserStats.PROFILE);
      wrapper.find('MenuItem').at(1).simulate('click');
      expect(wrapper.state().activeMenuItem).toBe(PureUserStats.TRACKS);
      wrapper.find('MenuItem').at(2).simulate('click');
      expect(wrapper.state().activeMenuItem).toBe(PureUserStats.ARTISTS);
    });

    it('renders Profile as default', () => {
      props.statsLoaded = true;
      const wrapper = shallow(<PureUserStats {...props} />);
      expect(wrapper.find(Profile).length).toBe(1);
    });

    it('renders Profile if option in menu is clicked', () => {
      props.statsLoaded = true;
      const wrapper = shallow(<PureUserStats {...props} />);
      wrapper.find('MenuItem').at(1).simulate('click');
      expect(wrapper.find(Profile).length).toBe(0);
      wrapper.find('MenuItem').at(0).simulate('click');
      expect(wrapper.find(Profile).length).toBe(1);
    });

    it('renders Tracks if option in menu is clicked', () => {
      props.statsLoaded = true;
      const wrapper = shallow(<PureUserStats {...props} />);
      expect(wrapper.find(Tracks).length).toBe(0);
      wrapper.find('MenuItem').at(1).simulate('click');
      expect(wrapper.find(Tracks).length).toBe(1);
    });

    it('renders Artists if option in menu is clicked', () => {
      props.statsLoaded = true;
      const wrapper = shallow(<PureUserStats {...props} />);
      expect(wrapper.find(Artists).length).toBe(0);
      wrapper.find('MenuItem').at(2).simulate('click');
      expect(wrapper.find(Artists).length).toBe(1);
    });

    it('does not render anything in a weird behavior', () => {
      props.statsLoaded = true;
      const wrapper = shallow(<PureUserStats {...props} />);
      wrapper.setState({ activeMenuItem: 'unknown' });
      expect(wrapper.find(Profile).length).toBe(0);
      expect(wrapper.find(Tracks).length).toBe(0);
      expect(wrapper.find(Artists).length).toBe(0);
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
