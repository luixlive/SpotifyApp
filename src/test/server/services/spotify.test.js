import _ from 'lodash';
import config from 'config';
import nock from 'nock';

import httpStatus from './../../../utils/http_status';
import { spotifyService } from './../../../server/services';
import {
  mockSpotifyRefreshToken,
  mockSpotifyTopArtists,
  mockSpotifyTopTracks,
} from './../../test_utils/mock_data';

describe('Server Services - Spotify', () => {
  const SPOTIFY_API_URL = config.get('SPOTIFY_API_URL');

  describe('Get users top artists', () => {
    const { ENDPOINT } = config.get('SPOTIFY_API_ENDPOINTS').TOP_ARTISTS;

    it('returns artists', () => {
      const accessToken = 'accessToken';
      const response = _.cloneDeep(mockSpotifyTopArtists);

      nock(SPOTIFY_API_URL).get(`/${ENDPOINT}`)
        .reply(httpStatus.OK, response);
      spotifyService.getUsersTopArtists(
        accessToken,
        null,
        (err, res) => expect(res.body).toEqual(response),
      );
    });

    it('returns artists taking options into account', () => {
      const accessToken = 'accessToken';
      const options = { limit: 1, offset: 1, timeRange: 'short_term' };
      const response = _.cloneDeep(mockSpotifyTopArtists);
      const queryParams = [
        `limit=${options.limit}`,
        `offset=${options.offset}`,
        `time_range=${options.timeRange}`,
      ];

      nock(SPOTIFY_API_URL)
        .get(`/${ENDPOINT}?${queryParams.join('&')}`)
        .reply(httpStatus.OK, response);
      spotifyService.getUsersTopArtists(
        accessToken,
        options,
        (err, res) => expect(res.body).toEqual(response),
      );
    });

    it('returns an error response', () => {
      const accessToken = 'accessToken';
      const error = 'error';

      nock(SPOTIFY_API_URL).get(`/${ENDPOINT}`)
        .replyWithError(error);
      spotifyService.getUsersTopArtists(
        accessToken,
        null,
        err => expect(err.message).toEqual(error),
      );
    });
  });

  describe('Get users top tracks', () => {
    const { ENDPOINT } = config.get('SPOTIFY_API_ENDPOINTS').TOP_TRACKS;

    it('returns tracks', () => {
      const accessToken = 'accessToken';
      const response = _.cloneDeep(mockSpotifyTopTracks);

      nock(SPOTIFY_API_URL).get(`/${ENDPOINT}`)
        .reply(httpStatus.OK, response);
      spotifyService.getUsersTopTracks(
        accessToken,
        null,
        (err, res) => expect(res.body).toEqual(response),
      );
    });

    it('returns tracks taking options into account', () => {
      const response = _.cloneDeep(mockSpotifyTopTracks);
      const accessToken = 'accessToken';
      const options = { limit: 30, offset: 5, timeRange: 'short_term' };
      const queryParams = [
        `limit=${options.limit}`,
        `offset=${options.offset}`,
        `time_range=${options.timeRange}`,
      ];

      nock(SPOTIFY_API_URL)
        .get(`/${ENDPOINT}?${queryParams.join('&')}`)
        .reply(httpStatus.OK, response);
      spotifyService.getUsersTopTracks(
        accessToken,
        options,
        (err, res) => expect(res.body).toEqual(response),
      );
    });

    it('returns an error response', () => {
      const accessToken = 'accessToken';
      const error = 'error';

      nock(SPOTIFY_API_URL).get(`/${ENDPOINT}`)
        .replyWithError(error);
      spotifyService.getUsersTopTracks(
        accessToken,
        null,
        err => expect(err.message).toEqual(error),
      );
    });
  });

  describe('Refresh access token', () => {
    const {
      ENDPOINT,
    } = config.get('SPOTIFY_ACCOUNTS_ENDPOINTS').REFRESH_ACCESS_TOKEN;
    const SPOTIFY_ACCOUNTS_URL = config.get('SPOTIFY_ACCOUNTS_URL');

    it('returns tracks', () => {
      const refreshToken = 'refreshToken';
      const response = _.cloneDeep(mockSpotifyRefreshToken);

      nock(SPOTIFY_ACCOUNTS_URL).post(`/${ENDPOINT}`)
        .reply(httpStatus.OK, response);
      spotifyService.refreshAccessToken(
        refreshToken,
        (err, res) => expect(res.body).toEqual(response),
      );
    });

    it('returns an error response', () => {
      const refreshToken = 'refreshToken';
      const error = 'error';

      nock(SPOTIFY_ACCOUNTS_URL).post(`/${ENDPOINT}`)
        .replyWithError(error);
      spotifyService.getUsersTopTracks(
        refreshToken,
        err => expect(err.message).toEqual(error),
      );
    });
  });
});
