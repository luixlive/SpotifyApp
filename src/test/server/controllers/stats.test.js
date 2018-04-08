import _ from 'lodash';

import error from './../../test_utils/error';
import httpStatus from './../../../utils/http_status';
import {
  mockSpotifyTopArtists,
  mockSpotifyTopTracks,
  mockTopArtists,
  mockTopTracks,
  mockUser,
} from './../../test_utils/mock_data';
import { statsController } from './../../../server/controllers';
import {
  UNEXPECTED_SPOTIFY_RESPONSE,
} from './../../../server/util/error_responses';

describe('Server Controllers - Stats', () => {
  let req;
  let res;
  let user;
  beforeEach(() => {
    user = _.cloneDeep(mockUser);
    req = { user, query: { key: 'value' } };
    res = { send: jest.fn(), status: jest.fn() };
  });

  describe('Top Artists', () => {
    let response;
    beforeEach(() => {
      response = { body: { items: _.cloneDeep(mockSpotifyTopArtists) } };
    });

    it('calls service to retrieve artists', () => {
      const service = jest.fn();
      statsController.topArtists(service)(req, res);
      expect(service).toHaveBeenCalledTimes(1);
      expect(service.mock.calls[0][0]).toBe(user.accessToken);
      expect(service.mock.calls[0][1]).toBe(req.query);
      expect(service.mock.calls[0][2]).toBeInstanceOf(Function);
    });

    it('returns top cleaned artists in callback', () => {
      const mockService = (token, options, callback) => {
        callback(null, response);
      };
      statsController.topArtists(mockService)(req, res);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0]).toEqual(mockTopArtists);
    });

    it('returns bad gateway error when service returns error', () => {
      const mockService = (token, options, callback) => {
        callback(error, null);
      };
      statsController.topArtists(mockService)(req, res);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_GATEWAY);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0].error).toBe(error);
    });

    it('returns bad gateway error when Spotifys response is unexpected', () => {
      const mockService = (token, options, callback) => {
        callback(null, null);
      };
      statsController.topArtists(mockService)(req, res);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_GATEWAY);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0].error).toBe(UNEXPECTED_SPOTIFY_RESPONSE);
    });
  });

  describe('Top Tracks', () => {
    let response;
    beforeEach(() => {
      response = { body: { items: _.cloneDeep(mockSpotifyTopTracks) } };
    });

    it('calls service to retrieve tracks', () => {
      const service = jest.fn();
      statsController.topTracks(service)(req, res);
      expect(service).toHaveBeenCalledTimes(1);
      expect(service.mock.calls[0][0]).toBe(user.accessToken);
      expect(service.mock.calls[0][1]).toBe(req.query);
      expect(service.mock.calls[0][2]).toBeInstanceOf(Function);
    });

    it('returns top cleaned tracks in callback', () => {
      const mockService = (token, options, callback) => {
        callback(null, response);
      };

      // Validate that it also cleans property external_urls into externalUrls
      response.body.items[0].artists = [{ external_urls: 'example' }];
      const customMockTopTracks = _.cloneDeep(mockTopTracks);
      customMockTopTracks[0].artists = [{ externalUrls: 'example' }];

      statsController.topTracks(mockService)(req, res);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0]).toEqual(customMockTopTracks);
    });

    it('returns bad gateway error when service returns error', () => {
      const mockService = (token, options, callback) => {
        callback(error, null);
      };
      statsController.topTracks(mockService)(req, res);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_GATEWAY);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0].error).toBe(error);
    });

    it('returns bad gateway error when Spotifys response is unexpected', () => {
      const mockService = (token, options, callback) => {
        callback(null, null);
      };
      statsController.topTracks(mockService)(req, res);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_GATEWAY);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0].error).toBe(UNEXPECTED_SPOTIFY_RESPONSE);
    });
  });
});
