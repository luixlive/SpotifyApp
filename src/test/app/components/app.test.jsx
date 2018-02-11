import React from 'react';
import renderer from 'react-test-renderer';

import App from './../../../app/components/app';

describe('App', () => {
  let props;

  beforeEach(() => {
    props = {
      children: <div>Dummy Component</div>,
    };
  });

  test('Snapshot', () => {
    const component = renderer.create(<App {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
