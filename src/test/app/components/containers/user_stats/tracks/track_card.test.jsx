import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  trackCard as componentProps,
} from './../../../../../test_utils/components_props';
import initialState from './../../../../../test_utils/initial_state';
import TrackCard, {
  formatArtists,
  formatSongTime,
  PureTrackCard,
/* eslint-disable-next-line max-len */
} from './../../../../../../app/components/containers/user_stats/tracks/track_card';

describe('App Components - Track Card', () => {
  describe('Helpers', () => {
    it('formats various artists with commas', () => {
      const artists = [{
        id: '1',
        spotifyUrl: 'url1',
        name: 'name1',
      }, {
        id: '2',
        spotifyUrl: 'url2',
        name: 'name2',
      }];
      const anchorTagsArtistsList = formatArtists(artists);

      let wrapper = shallow(anchorTagsArtistsList[0]);
      expect(wrapper.props().href).toEqual(artists[0].spotifyUrl);
      expect(wrapper.text()).toEqual(`${artists[0].name}, `);

      wrapper = shallow(anchorTagsArtistsList[1]);
      expect(wrapper.props().href).toEqual(artists[1].spotifyUrl);
      expect(wrapper.text()).toEqual(`${artists[1].name}`);
    });

    it('formats ms into m:ss format', () => {
      expect(formatSongTime(120000)).toEqual('2:00');
      expect(formatSongTime(3000)).toEqual('0:03');
      expect(formatSongTime(1580000)).toEqual('26:20');
    });
  });

  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders no mobile', () => {
      const rendered = renderer.create(<PureTrackCard {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile', () => {
      props.deviceMobile = true;
      const rendered = renderer.create(<PureTrackCard {...props} />).toJSON();
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
          <TrackCard place={0} />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureTrackCard).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureTrackCard).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
