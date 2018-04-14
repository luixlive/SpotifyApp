import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  tracks as componentProps,
} from './../../../../../test_utils/components_props';
import initialState from './../../../../../test_utils/initial_state';
import Tracks, {
  PureTracks,
} from './../../../../../../app/components/containers/user_stats/tracks/tracks';

describe('App Components - Tracks', () => {
  const mockStore = configureStore();
  let store;
  beforeAll(() => {
    store = mockStore(initialState);
  });

  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders no mobile', () => {
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTracks {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile', () => {
      props.deviceMobile = true;
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTracks {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Provider', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount((
        <Provider store={store}>
          <Tracks />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureTracks).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureTracks).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
