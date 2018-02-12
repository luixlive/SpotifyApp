import React from 'react';
import renderer from 'react-test-renderer';

import { UserStats } from './../../../app/components';

describe('UserStats', () => {
  test('Snapshot', () => {
    const component = renderer.create(<UserStats />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
