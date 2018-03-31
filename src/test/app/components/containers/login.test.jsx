import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import { Route, Switch } from 'react-router-dom';

import Login, {
  PureLogin,
} from './../../../../app/components/containers/login';
import initialState from './../../../test_utils/initial_state';
import injectRouter from './../../../test_utils/inject_router';
import {
  login as componentProps,
} from './../../../test_utils/components_props';

describe('App Components - Login', () => {
  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders user not authenticated', () => {
      const mockStore = configureStore();
      const store = mockStore(initialState);
      const rendered = renderer.create((
        <Provider store={store}>
          <PureLogin {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user authenticated', () => {
      props.userAuthenticated = true;
      const rendered = renderer.create(injectRouter(
        () => (
          <Switch>
            <Route
              exact
              path="/"
              component={() => <div>Should render this</div>}
            />
            <Route
              path="/login"
              component={() => <PureLogin {...props} />}
            />
          </Switch>
        ),
        '/login',
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(<Provider store={store}><Login /></Provider>);
    });

    it('renders', () => {
      expect(wrapper.find(PureLogin).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureLogin).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
