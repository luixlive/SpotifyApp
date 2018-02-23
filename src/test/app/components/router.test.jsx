import React from 'react';
import { shallow } from 'enzyme';

import {
  LoginConnected,
  Router,
  UserStatsConnected,
} from './../../../app/components';

describe('App Components - Router', () => {
  it('renders correct routes', () => {
    const wrapper = shallow(<Router />);
    // TODO: Find a better way to do this (or test Router)
    const pathMap = {};
    wrapper.find('Route').reduce((paths, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return undefined;
    }, {});

    expect(pathMap['/']).toBe(LoginConnected);
    expect(pathMap['/stats']).toBe(UserStatsConnected);
  });
});
