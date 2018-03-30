import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  ConnectedNotFound,
  NotFound,
} from './../../../../app/components/containers/not_found';
import initialState from './../../../test_utils/initial_state';
import injectRouter from './../../../test_utils/inject_router';
import {
  loginContainer as componentProps,
} from './../../../test_utils/components_props';

describe('App Components - NotFound', () => {
  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders no mobile', () => {
      const rendered =
        renderer.create(injectRouter(() => <NotFound {...props} />)).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile', () => {
      props.isDeviceMobile = true;
      const rendered =
        renderer.create(injectRouter(() => <NotFound {...props} />)).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(injectRouter(() =>
        <Provider store={store}><ConnectedNotFound /></Provider>));
    });

    it('renders', () => {
      expect(wrapper.find(ConnectedNotFound).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(NotFound).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
