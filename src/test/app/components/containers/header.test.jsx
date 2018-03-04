import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import {
  ConnectedAppHeader,
  AppHeader,
} from './../../../../app/components/containers/header';
import emptyFunction from './../../../test_utils/empty_function';
import initialState from './../../../test_utils/initial_state';

describe('App Components - Header', () => {
  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = {
        isDeviceMobile: false,
        isUserAuthenticated: false,
        logoutUser: emptyFunction,
      };
    });

    it('renders no mobile', () => {
      const rendered = renderer.create(<AppHeader {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile', () => {
      props.isDeviceMobile = true;
      const rendered = renderer.create(<AppHeader {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user authenticated', () => {
      props.isUserAuthenticated = true;
      const rendered = renderer.create(<AppHeader {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    let props;
    beforeEach(() => {
      props = {
        isDeviceMobile: false,
        isUserAuthenticated: false,
        logoutUser: emptyFunction,
      };
    });

    describe('General', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<AppHeader {...props} />);
      });

      it('renders', () => {
        expect(wrapper.length).toEqual(1);
      });

      it('renders the Spotify Stats header', () => {
        expect(wrapper.find('Header').prop('children'))
          .toEqual('Spotify Stats');
      });
    });

    describe('Not mobile', () => {
      let wrapper;
      beforeAll(() => {
        wrapper = shallow(<AppHeader {...props} />);
      });

      it('renders the Spotify Stats header as h2', () => {
        expect(wrapper.find('Header').prop('as')).toEqual('h2');
      });

      it('renders the sign in button', () => {
        expect(wrapper.find('Button').prop('children'))
          .toEqual('Sign in with Spotify');
      });
    });

    describe('Mobile', () => {
      let wrapper;
      beforeAll(() => {
        props.isDeviceMobile = true;
        wrapper = shallow(<AppHeader {...props} />);
      });

      it('renders the Spotify Stats header as h3', () => {
        expect(wrapper.find('Header').prop('as')).toEqual('h3');
      });

      it('renders the sign in button', () => {
        expect(wrapper.find('Button').prop('children'))
          .toEqual('Sign in');
      });
    });

    describe('User authenticated', () => {
      it('renders the sign in button', () => {
        props.isUserAuthenticated = true;
        const wrapper = shallow(<AppHeader {...props} />);
        expect(wrapper.find('Button').prop('children'))
          .toEqual('Logout');
      });
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeAll(() => {
      store = mockStore(initialState);
      wrapper = mount((
        <Provider store={store}>
          <ConnectedAppHeader />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(ConnectedAppHeader).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(wrapper.find(AppHeader).prop('isDeviceMobile'))
        .toEqual(initialState.isDeviceMobile);
    });
  });
});
