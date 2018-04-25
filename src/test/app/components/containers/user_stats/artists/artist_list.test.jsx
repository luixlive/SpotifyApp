import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  artistList as componentProps,
} from './../../../../../test_utils/components_props';
import initialState from './../../../../../test_utils/initial_state';
import { mockTopArtists } from './../../../../../test_utils/mock_data';
import ArtistList, {
  PureArtistList,
/* eslint-disable-next-line max-len */
} from './../../../../../../app/components/containers/user_stats/artists/artist_list';

describe('App Components - Artist List', () => {
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

    it('renders with some artists', () => {
      props.artists = _.cloneDeep(mockTopArtists);
      const rendered = renderer.create((
        <Provider store={store}>
          <PureArtistList {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders while reloading', () => {
      props.reloading = true;
      const rendered = renderer.create((
        <Provider store={store}>
          <PureArtistList {...props} />
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
          <ArtistList />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureArtistList).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureArtistList).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
