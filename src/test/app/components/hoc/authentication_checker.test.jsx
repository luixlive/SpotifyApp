import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import addRouterProps from './../../../test_utils/add_router_props';
import {
  authenticationChecker as componentProps,
} from './../../../test_utils/components_props';
import AuthenticationChecker, {
  getAuthenticationChecker,
} from './../../../../app/components/hoc/authentication_checker';
import initialState from './../../../test_utils/initial_state';
import * as types from './../../../../app/actions/types';

describe('App Components HOC - AuthenticationChecker', () => {
  describe('Snapshots', () => {
    let AuthenticationCheckerComponent;
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
      AuthenticationCheckerComponent = getAuthenticationChecker(() => <div />);
    });

    it('renders user not authenticated', () => {
      const rendered =
        renderer.create(<AuthenticationCheckerComponent {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders Redirect if user not authenticated and load finished', () => {
      props.loadUserFinished = true;
      const rendered = mount((
        <MemoryRouter initialIndex={0} initialEntries={['/stats']} >
          <Switch>
            <Route exact path="/" component={() => <div>Should render this</div>} />
            <Route path="/stats" component={() => <AuthenticationCheckerComponent {...props} />} />
          </Switch>
        </MemoryRouter>
      ));
      expect(toJson(rendered.find('div'))).toMatchSnapshot();
    });

    it('renders user authenticated and load finished', () => {
      props.isUserAuthenticated = true;
      props.loadUserFinished = true;
      const rendered =
        renderer.create(<AuthenticationCheckerComponent {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders user authenticated and logging out', () => {
      props.isUserAuthenticated = true;
      props.loadUserFinished = true;
      props.loggingOutUser = true;
      const rendered =
        renderer.create(<AuthenticationCheckerComponent {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    let AuthenticationCheckerComponent;
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
      props.loadUser = jest.fn();
      AuthenticationCheckerComponent = getAuthenticationChecker(() => <div />);
    });

    it('should call loadUser if user not authenticated', () => {
      mount(<AuthenticationCheckerComponent {...props} />);

      expect(props.loadUser).toHaveBeenCalledTimes(1);
    });

    it('shouldnt call loadUser if user authenticated', () => {
      props.isUserAuthenticated = true;
      mount(<AuthenticationCheckerComponent {...props} />);

      expect(props.loadUser).toHaveBeenCalledTimes(0);
    });
  });

  describe('Provider', () => {
    let RenderedComponent;
    let store;
    let wrapper;
    beforeAll(() => {
      const ComposedComponent = () => <div>Component</div>;
      const mockStore = configureStore();
      store = mockStore(initialState);
      RenderedComponent = AuthenticationChecker(ComposedComponent);
      wrapper = mount((
        <MemoryRouter>
          <Provider store={store}>
            <RenderedComponent />
          </Provider>
        </MemoryRouter>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(RenderedComponent).length).toEqual(1);
    });

    it('matches initial state', () => {
      const props = addRouterProps(componentProps);
      expect(Object.keys(wrapper.find('AuthenticationChecker').props()))
        .toEqual(Object.keys(props));
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
