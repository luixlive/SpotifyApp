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
import * as types from './../../../../app/actions/types';

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

    it('redirects to login on log in button click', () => {
      global.open = jest.fn();
      const wrapper = shallow(<AppHeader {...props} />);
      wrapper.find('Button').simulate('click');
      expect(global.open).toHaveBeenCalledTimes(1);
    });

    it('calls logoutUser on logout button click', () => {
      props.isUserAuthenticated = true;
      props.logoutUser = jest.fn();
      const wrapper = shallow(<AppHeader {...props} />);
      wrapper.find('Button').simulate('click');
      expect(props.logoutUser).toHaveBeenCalledTimes(1);
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

    it('dispatches logoutUser', () => {
      store = mockStore(_.merge({}, initialState, {
        user: { isUserAuthenticated: true },
      }));
      wrapper = mount((
        <Provider store={store}>
          <ConnectedAppHeader />
        </Provider>
      ));
      expect(store.getActions().length).toBe(0);
      wrapper.find('Button').simulate('click');

      const expectedAction = {
        type: types.LOGOUT_USER,
        payload: { },
      };
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});
