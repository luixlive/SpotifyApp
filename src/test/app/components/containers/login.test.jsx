import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import { Route, Switch } from 'react-router-dom';

import {
  ConnectedLogin,
  Login,
} from './../../../../app/components/containers/login';
import initialState from './../../../test_utils/initial_state';
import injectRouter from './../../../test_utils/inject_router';
import {
  loginContainer as componentProps,
} from './../../../test_utils/components_props';

describe('App Components - Login', () => {
  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders user not authenticated', () => {
      const rendered = renderer.create(<Login {...props} />).toJSON();
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
              component={() => <Login {...props} />}
            />
          </Switch>
        ),
        '/login',
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user not authenticated no mobile', () => {
      const rendered = renderer.create(<Login {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user not authenticated mobile', () => {
      props.deviceMobile = true;
      const rendered = renderer.create(<Login {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
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
          <ConnectedLogin />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(ConnectedLogin).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(Login).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
