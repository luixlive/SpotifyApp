import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import Error, {
  PureError,
} from './../../../../app/components/containers/error';
import initialState from './../../../test_utils/initial_state';
import injectRouter from './../../../test_utils/inject_router';
import * as types from './../../../../app/actions/types';
import {
  error as componentProps,
} from './../../../test_utils/components_props';

describe('App Components - Error', () => {
  const mockStore = configureStore();
  let props;
  let store;
  beforeEach(() => {
    props = _.cloneDeep(componentProps);
    store = mockStore(initialState);
  });

  describe('Snapshots', () => {
    it('renders', () => {
      const rendered = renderer.create(injectRouter(() => (
        <Provider store={store}>
          <PureError {...props} />
        </Provider>
      ))).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('calls clearError and loadUser when user clicks link', () => {
      const clearError = jest.fn();
      const loadUser = jest.fn();
      const wrapper = mount(injectRouter(() => (
        <Provider store={store}>
          <PureError
            {...props}
            clearError={clearError}
            loadUser={loadUser}
          />
        </Provider>
      )));
      wrapper.find('Link').simulate('click');
      expect(loadUser).toHaveBeenCalledTimes(1);
      expect(clearError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Provider', () => {
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(injectRouter(() => (
        <Provider store={store}>
          <Error />
        </Provider>
      )));
    });

    it('renders', () => {
      expect(wrapper.find(PureError).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureError).props()))
        .toEqual(Object.keys(componentProps));
    });

    it('dispatches clearError and loadUser', () => {
      expect(store.getActions().length).toBe(0);
      wrapper.find('Link').simulate('click');

      const expectedActions = [{
        type: types.CLEAR_ERROR,
        payload: {},
      }, {
        type: types.LOAD_USER,
        payload: {},
      }];
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });
});
