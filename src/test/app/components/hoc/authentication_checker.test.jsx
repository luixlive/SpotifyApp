import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import {
  authenticationChecker as componentProps,
} from './../../../test_utils/components_props';
import AuthenticationChecker, {
  getAuthenticationChecker,
} from './../../../../app/components/hoc/authentication_checker';
import initialState from './../../../test_utils/initial_state';
import injectRouter from './../../../test_utils/inject_router';

describe('App Components HOC - AuthenticationChecker', () => {
  describe('Snapshots', () => {
    let AuthenticationCheckerComponent;
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
      AuthenticationCheckerComponent = getAuthenticationChecker(() => <div />);
    });

    it('renders user not authenticated', () => {
      const rendered = mount(injectRouter(() => (
        <Switch>
          <Route
            exact
            path="/login"
            component={() => <div>Should render this</div>}
          />
          <Route
            path="/"
            component={() => <AuthenticationCheckerComponent {...props} />}
          />
        </Switch>
      )));
      expect(toJson(rendered.find('div'))).toMatchSnapshot();
    });

    it('renders user authenticated', () => {
      props.userAuthenticated = true;
      const rendered =
        renderer.create(<AuthenticationCheckerComponent {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user authenticated and logging out', () => {
      props.userAuthenticated = true;
      props.loggingOutUser = true;
      const rendered =
        renderer.create(<AuthenticationCheckerComponent {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Provider', () => {
    let RenderedComponent;
    let store;
    let wrapper;
    beforeAll(() => {
      const ComposedComponent = () => <div>Component</div>;
      const mockStore = configureStore();
      store = mockStore(_.merge({}, initialState, {
        user: { userAuthenticated: true },
      }));
      RenderedComponent = AuthenticationChecker(ComposedComponent);
      wrapper = mount((
        <Provider store={store}>
          <RenderedComponent />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(RenderedComponent).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find('AuthenticationChecker').props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
