import _ from 'lodash';

import error from './../../test_utils/error';
import httpStatus from './../../../utils/http_status';
import {
  mockSpotifyTopArtists,
  mockTopArtists,
  mockUser,
} from './../../test_utils/mock_data';
import { statsController } from './../../../server/controllers';
import {
  UNEXPECTED_SPOTIFY_RESPONSE,
} from './../../../server/util/error_responses';

describe('Server Controllers - Stats', () => {
  let req;
  let res;
  let responseValue;
  let statusValue;
  let user;
  beforeEach(() => {
    responseValue = undefined;
    statusValue = undefined;
    user = _.cloneDeep(mockUser);
    req = { user, query: { key: 'value' } };
    res = {
      send: (value) => { responseValue = value; },
      status: (status) => { statusValue = status; },
    };
  });

  describe('Top Artists', () => {
    let response;
    beforeEach(() => {
      response = { body: { items: _.cloneDeep(mockSpotifyTopArtists) } };
    });

    it('calls service to retrieve artists', () => {
      const service = jest.fn();
      statsController.topArtists(req, res, service);
      expect(service).toHaveBeenCalledTimes(1);
      expect(service.mock.calls[0][0]).toBe(user.accessToken);
      expect(service.mock.calls[0][1]).toBe(req.query);
      expect(service.mock.calls[0][2]).toBeInstanceOf(Function);
    });

    it('returns top cleaned artists in callback', () => {
      const mockService = (token, options, callback) => {
        callback(null, response);
      };
      statsController.topArtists(req, res, mockService);
      expect(responseValue).toEqual(mockTopArtists);
    });

    it('returns bad gateway error when service returns error', () => {
      const mockService = (token, options, callback) => {
        callback(error, null);
      };
      statsController.topArtists(req, res, mockService);
      expect(statusValue).toBe(httpStatus.BAD_GATEWAY);
      expect(responseValue.error).toBe(error);
    });

    it('returns bad gateway error when Spotifys response is unexpected', () => {
      const mockService = (token, options, callback) => {
        callback(null, null);
      };
      statsController.topArtists(req, res, mockService);
      expect(statusValue).toBe(httpStatus.BAD_GATEWAY);
      expect(responseValue.error).toBe(UNEXPECTED_SPOTIFY_RESPONSE);
    });
  });
});
