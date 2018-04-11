import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import initialState from './../../../test_utils/initial_state';
import {
  message as componentProps,
} from './../../../test_utils/components_props';
import Message, {
  PureMessage,
} from './../../../../app/components/templates/message';

describe('App Components Templates - Message', () => {
  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders no mobile', () => {
      const rendered = renderer.create(<PureMessage {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile', () => {
      props.deviceMobile = true;
      const rendered = renderer.create(<PureMessage {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders custom title', () => {
      props.title = 'title';
      const rendered = renderer.create(<PureMessage {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeAll(() => {
      store = mockStore(initialState);
      wrapper = mount((
        <Provider store={store}>
          <Message title={componentProps.title}>
            {componentProps.children}
          </Message>
        </Provider>));
    });

    it('renders', () => {
      expect(wrapper.find(PureMessage).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureMessage).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
