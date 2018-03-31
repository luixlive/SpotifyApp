import React from 'react';
import renderer from 'react-test-renderer';

import { Footer } from './../../../app/components';

describe('App Components - Footer', () => {
  it('renders', () => {
    const rendered = renderer.create(<Footer />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
