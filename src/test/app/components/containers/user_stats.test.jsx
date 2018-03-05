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

    it('renders user not authenticated and load not finished', () => {
      const rendered = renderer.create(<UserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user authenticated and load not finished', () => {
      props.isUserAuthenticated = true;
      const rendered = renderer.create(<UserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user authenticated and load finished', () => {
      props.loadUserFinished = true;
      const rendered = renderer.create(<UserStats {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user not authenticated and load finished', () => {
      props.isUserAuthenticated = false;
      // With Route we mock the current location of the router
      const rendered = renderer
        .create((
          <MemoryRouter>
            <Route component={() => <UserStats {...props} />} path="/stats" />
          </MemoryRouter>))
        .toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user authenticated and load finished while logging out', () => {
      props.isUserAuthenticated = true;
      props.loggingOutUser = true;
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

      it('renders big loader', () => {
        expect(wrapper.find('Loader').length).toEqual(1);
        expect(wrapper.find('Loader').prop('size')).toEqual('big');
      });

      it('has an active dimmer', () => {
        expect(wrapper.find('Dimmer').length).toEqual(1);
        expect(wrapper.find('Dimmer').prop('active')).toBeTruthy();
      });

      it('calls loadUserStats when componentDidMount', () => {
        const loadUserStats = jest.fn();
        mount(<UserStats {...props} loadUserStats={loadUserStats} />);
        expect(loadUserStats).toHaveBeenCalledTimes(1);
      });
    });

    describe('User couldnt authenticate', () => {
      it('renders Redirect component', () => {
        props.loadUserFinished = true;
        const wrapper = shallow(<UserStats {...props} />);
        expect(wrapper.find('Redirect').length).toEqual(1);
        expect(wrapper.find('Redirect').prop('to')).toEqual('/');
      });
    });

    // TODO: When UserStats component is finished, check not only the dimmer but
    // also that it renders all the components

    describe('User could authenticate', () => {
      it('has an active dimmer', () => {
        props.isUserAuthenticated = true;
        const wrapper = shallow(<UserStats {...props} />);
        expect(wrapper.find('Dimmer').prop('active')).toBeTruthy();
      });
    });

    describe('User stats were loaded', () => {
      it('has an inactive dimmer', () => {
        props.statsLoaded = true;
        const wrapper = shallow(<UserStats {...props} />);
        expect(wrapper.find('Dimmer').prop('active')).toBeFalsy();
      });
    });

    describe('User is logging out', () => {
      it('has an active dimmer', () => {
        props.loggingOutUser = true;
        const wrapper = shallow(<UserStats {...props} />);
        expect(wrapper.find('Dimmer').prop('active')).toBeTruthy();
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
