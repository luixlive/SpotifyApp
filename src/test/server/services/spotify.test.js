import nock from 'nock';

import httpStatus from './../../../utils/http_status';
import { spotifyService } from './../../../server/services';

describe('Server Services - Spotify', () => {
  describe('Get users top artists', () => {
    it('returns artists', () => {
      const response = { artists: ['1', '2'] };
      nock('https://api.spotify.com').get('/v1/me/top/artists')
        .reply(httpStatus.OK, response);
      const accessToken = 'accessToken';
      spotifyService.getUsersTopArtists(
        accessToken,
        null,
        (err, res) => expect(res.body).toEqual(response),
      );
    });

    it('returns artists taking options into account', () => {
      const response = { artists: ['2'] };
      nock('https://api.spotify.com')
        .get('/v1/me/top/artists?limit=1&offset=1&time_range=short_term')
        .reply(httpStatus.OK, response);
      const accessToken = 'accessToken';
      const options = {
        limit: 1,
        offset: 1,
        timeRange: 'short_term',
      };
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
});
