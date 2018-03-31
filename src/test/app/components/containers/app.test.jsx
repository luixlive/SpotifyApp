import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import {
  app as componentProps,
} from './../../../test_utils/components_props';
import {
  ConnectedApp,
  PureApp,
} from './../../../../app/components/containers/app';
import initialState from './../../../test_utils/initial_state';
import injectRouter from './../../../test_utils/inject_router';
import trivialReactElement from './../../../test_utils/trivial_react_element';
import * as types from './../../../../app/actions/types';

describe('App Components - App', () => {
  const mockStore = configureStore();
  let store;
  beforeAll(() => {
    store = mockStore(initialState);
  });

  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders user not loaded', () => {
      const rendered = renderer.create(injectRouter(() => (
        <Provider store={store}>
          <PureApp {...props} />
        </Provider>
      ))).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user loaded', () => {
      props.userLoaded = true;
      const rendered = renderer.create(injectRouter(() => (
        <Provider store={store}>
          <PureApp {...props} />
        </Provider>
      ))).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Provider', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(injectRouter(() => (
        <Provider store={store}>
          <ConnectedApp>
            {trivialReactElement}
          </ConnectedApp>
        </Provider>
      )));
    });

    it('renders', () => {
      expect(wrapper.find(PureApp).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureApp).props()))
        .toEqual(Object.keys(componentProps));
    });

    it('dispatches loadUser', () => {
      const expectedAction = {
        type: types.LOAD_USER,
        payload: { },
      };
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

