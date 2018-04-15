import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import initialState from './../../../../test_utils/initial_state';
import TracksArtistsTemplate, {
  PureTracksArtistsTemplate,
/* eslint-disable-next-line max-len */
} from './../../../../../app/components/containers/user_stats/tracks_artists_template';
import {
  tracksArtistsTemplate as componentProps,
} from './../../../../test_utils/components_props';

describe('App Components - TracksArtistsTemplate', () => {
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

    it('renders device no mobile type tracks', () => {
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTracksArtistsTemplate {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders device mobile type tracks', () => {
      props.deviceMobile = true;
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTracksArtistsTemplate {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders device no mobile type artists', () => {
      props.type = 'artists';
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTracksArtistsTemplate {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders device mobile type artists', () => {
      props.deviceMobile = true;
      props.type = 'artists';
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTracksArtistsTemplate {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('returns null when renderPage and there is an invalid type', () => {
      const props = _.cloneDeep(componentProps);
      props.type = 'unknown';
      const wrapper = shallow(<PureTracksArtistsTemplate {...props} />);
      expect(wrapper.instance().renderPage()).toBeNull();
    });
  });

  describe('Provider', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount((
        <Provider store={store}>
          <TracksArtistsTemplate type="tracks" />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureTracksArtistsTemplate).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureTracksArtistsTemplate).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
