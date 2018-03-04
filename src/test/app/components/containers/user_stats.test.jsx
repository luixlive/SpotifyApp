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
import emptyFunction from './../../../test_utils/empty_function';
import initialState from './../../../test_utils/initial_state';

describe('App Components - UserStats', () => {
  describe('Snapshots', () => {
    let props;
    beforeAll(() => {
      props = {
        isUserAuthenticated: false,
        loadUserFinished: false,
        loadUserStats: emptyFunction,
      };
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
      const rendered = renderer
        .create(<UserStats {...props} />)
        .toJSON();
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
  });

  describe('Behavior', () => {
    describe('General', () => {
      let props;
      let wrapper;
      beforeAll(() => {
        props = {
          isUserAuthenticated: false,
          loadUserFinished: false,
          loadUserStats: emptyFunction,
        };
        wrapper = shallow(<UserStats {...props} />);
      });

      it('renders', () => {
        expect(wrapper.length).toEqual(1);
      });

      it('renders big loader', () => {
        expect(wrapper.find('Loader').length).toEqual(1);
        expect(wrapper.find('Loader').prop('size')).toEqual('big');
      });

      it('calls loadUserStats when componentDidMount', () => {
        const spy = jest.fn();
        mount(<UserStats {...props} loadUserStats={spy} />);
        expect(spy).toHaveBeenCalledTimes(1);
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
      expect(wrapper.find(UserStats).prop('loadUserStats'))
        .toBeInstanceOf(Function);
    });
  });
});
