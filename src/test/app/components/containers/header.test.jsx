import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import {
  appHeaderContainer as componentProps,
} from './../../../test_utils/components_props';
import {
  ConnectedAppHeader,
  AppHeader,
} from './../../../../app/components/containers/header';
import initialState from './../../../test_utils/initial_state';

describe('App Components - Header', () => {
  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
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
      props = _.cloneDeep(componentProps);
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
      it('renders the logout button', () => {
        props.isUserAuthenticated = true;
        const wrapper = shallow(<AppHeader {...props} />);
        expect(wrapper.find('Button').prop('children'))
          .toEqual('Logout');
      });
    });

    describe('Events', () => {
      it('redirects to login on sign in button click', () => {
        const open = jest.fn();
        global.open = open;
        const wrapper = shallow(<AppHeader {...props} />);
        wrapper.find('Button').simulate('click');
        expect(open).toHaveBeenCalledTimes(1);
      });

      it('calls logoutUser on logout button click', () => {
        const logoutUser = jest.fn();
        props.isUserAuthenticated = true;
        const wrapper =
          shallow(<AppHeader {...props} logoutUser={logoutUser} />);
        wrapper.find('Button').simulate('click');
        expect(logoutUser).toHaveBeenCalledTimes(1);
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
      expect(Object.keys(wrapper.find(AppHeader).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
