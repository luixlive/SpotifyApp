import _ from 'lodash';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  screenLoader as componentProps,
} from './../../../test_utils/components_props';
import ScreenLoader from './../../../../app/components/templates/screen_loader';

describe('App Components Templates - Screen Loader', () => {
  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders', () => {
      const rendered = renderer.create(<ScreenLoader {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders with custom text', () => {
      props.text = 'text';
      const rendered = renderer.create(<ScreenLoader {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
