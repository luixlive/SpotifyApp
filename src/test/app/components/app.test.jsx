import React from 'react';
import renderer from 'react-test-renderer';

import App from './../../../app/components/app';

describe('App', () => {
  test('Snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
