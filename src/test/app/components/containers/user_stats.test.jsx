import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import {
  ConnectedUserStats,
  UserStats,
} from './../../../../app/components/containers/user_stats';
import initialState from './../../../test_utils/initial_state';
import {
  userStatsContainer as componentProps,
} from './../../../test_utils/components_props';

describe('App Components - UserStats', () => {
  describe('Snapshots', () => {
    let props;
    beforeAll(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders stats not loaded', () => {
      const rendered = renderer.create(<UserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders stats loaded', () => {
      props.statsLoaded = true;
      const rendered = renderer.create(<UserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    let props;
    beforeAll(() => {
      props = _.cloneDeep(componentProps);
    });

    describe('General', () => {
      let wrapper;
      beforeAll(() => {
        wrapper = shallow(<UserStats {...props} />);
      });

      it('renders', () => {
        expect(wrapper.length).toEqual(1);
      });

      // TODO: move to authentication_checker test
      // it('renders big loader', () => {
      //   expect(wrapper.find('Loader').length).toEqual(1);
      //   expect(wrapper.find('Loader').prop('size')).toEqual('big');
      // });

      // it('has an active dimmer', () => {
      //   expect(wrapper.find('Dimmer').length).toEqual(1);
      //   expect(wrapper.find('Dimmer').prop('active')).toBeTruthy();
      // });

      it('calls loadUserStats when componentDidMount', () => {
        const loadUserStats = jest.fn();
        mount(<UserStats {...props} loadUserStats={loadUserStats} />);
        expect(loadUserStats).toHaveBeenCalledTimes(1);
      });
    });

    describe('User stats not loaded yet', () => {
      it('renders the ScreenLoader', () => {
        const wrapper = shallow(<UserStats {...props} />);
        expect(wrapper.find('ScreenLoader').length).toEqual(1);
      });
    });

    describe('User stats were loaded', () => {
      it('hides the ScreenLoader', () => {
        props.statsLoaded = true;
        const wrapper = shallow(<UserStats {...props} />);
        expect(wrapper.find('ScreenLoader').length).toEqual(0);
      });
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
          <ConnectedUserStats />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(ConnectedUserStats).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(UserStats).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
