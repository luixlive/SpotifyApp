import nock from 'nock';

import httpStatus from './../../../utils/http_status';
import { spotifyService } from './../../../server/services';

describe('Server Services - Spotify', () => {
  describe('Get users top artists', () => {
    it('returns artists', () => {
      const accessToken = 'accessToken';
      const response = { artists: ['1', '2'] };

      nock('https://api.spotify.com').get('/v1/me/top/artists')
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
      const response = { artists: ['2'] };
      const queryParams = [
        `limit=${options.limit}`,
        `offset=${options.offset}`,
        `time_range=${options.timeRange}`,
      ];

      nock('https://api.spotify.com')
        .get(`/v1/me/top/artists?${queryParams.join('&')}`)
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

      nock('https://api.spotify.com').get('/v1/me/top/artists')
        .replyWithError(error);
      spotifyService.getUsersTopArtists(
        accessToken,
        null,
        err => expect(err.message).toEqual(error),
      );
    });
  });

  describe('Get users top tracks', () => {
    it('returns tracks', () => {
      const accessToken = 'accessToken';
      const response = { tracks: ['1', '2'] };

      nock('https://api.spotify.com').get('/v1/me/top/tracks')
        .reply(httpStatus.OK, response);
      spotifyService.getUsersTopTracks(
        accessToken,
        null,
        (err, res) => expect(res.body).toEqual(response),
      );
    });

    it('returns tracks taking options into account', () => {
      const response = { tracks: ['2'] };
      const accessToken = 'accessToken';
      const options = { limit: 30, offset: 5, timeRange: 'short_term' };
      const queryParams = [
        `limit=${options.limit}`,
        `offset=${options.offset}`,
        `time_range=${options.timeRange}`,
      ];

      nock('https://api.spotify.com')
        .get(`/v1/me/top/tracks?${queryParams.join('&')}`)
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

      nock('https://api.spotify.com').get('/v1/me/top/tracks')
        .replyWithError(error);
      spotifyService.getUsersTopTracks(
        accessToken,
        null,
        err => expect(err.message).toEqual(error),
      );
    });
  });
});
