import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  artistCard as componentProps,
} from './../../../../../test_utils/components_props';
import initialState from './../../../../../test_utils/initial_state';
import ArtistCard, {
  formatGenres,
  PureArtistCard,
/* eslint-disable-next-line max-len */
} from './../../../../../../app/components/containers/user_stats/artists/artist_card';

describe('App Components - Artist Card', () => {
  describe('Helpers', () => {
    it('formats genres with a break between them', () => {
      const genres = ['genre 1', 'genre 2'];
      const genresSeparatedByBreaks = formatGenres(genres);

      const wrapper = shallow(<div>{genresSeparatedByBreaks}</div>);
      expect(wrapper.text().includes('genre 1')).toBeFalsy();
      expect(wrapper.text().includes('Genre 1')).toBeTruthy();
      expect(wrapper.text().includes('genre 2')).toBeFalsy();
      expect(wrapper.text().includes('Genre 2')).toBeTruthy();
      expect(wrapper.find('br').length).toBe(2);
    });
  });

  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders no mobile', () => {
      const rendered = renderer.create(<PureArtistCard {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders mobile', () => {
      props.deviceMobile = true;
      const rendered = renderer.create(<PureArtistCard {...props} />).toJSON();
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
          <ArtistCard place={0} />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureArtistCard).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureArtistCard).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
