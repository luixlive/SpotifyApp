import nock from 'nock';

import httpStatus from './../../../utils/http_status';
import { spotifyService } from './../../../server/services';

describe('Server Services - Spotify', () => {
  describe('Get users top artists', () => {
    it('calls callback with response', () => {
      const response = { artists: ['1', '2'] };
      nock('https://api.spotify.com').get('/v1/me/top/artists')
        .reply(httpStatus.OK, response);
      const accessToken = 'accessToken';
      spotifyService.getUsersTopArtists(
        accessToken,
        (err, res) => expect(res.body).toEqual(response),
      );
    });

    it('calls callback whit error', () => {
      const accessToken = 'accessToken';
      const error = 'error';
      nock('https://api.spotify.com').get('/v1/me/top/artists')
        .replyWithError(error);
      spotifyService.getUsersTopArtists(
        accessToken,
        err => expect(err.message).toEqual(error),
      );
    });
  });
});
