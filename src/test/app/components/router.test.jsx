import React from 'react';
import renderer from 'react-test-renderer';

import { Router } from './../../../app/components';

describe('Router', () => {
  test('Snapshot', () => {
    const component = renderer.create(<Router />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
