import _ from 'lodash';

import error from './../../test_utils/error';
import httpStatus from './../../../utils/http_status';
import mockUser from './../../test_utils/mock_user';
import { statsController } from './../../../server/controllers';
import {
  UNEXPECTED_SPOTIFY_RESPONSE,
} from './../../../server/util/error_responses';

describe('Server Controllers - Stats', () => {
  let response;
  let req;
  let res;
  let responseValue;
  let statusValue;
  let user;
  beforeEach(() => {
    response = { body: { items: ['1', '2'] } };
    responseValue = undefined;
    statusValue = undefined;
    user = _.cloneDeep(mockUser);
    req = { user };
    res = {
      send: (value) => { responseValue = value; },
      status: (status) => { statusValue = status; },
    };
  });

  describe('Top Artists', () => {
    it('calls service to retrieve artists', () => {
      const service = jest.fn();
      statsController.topArtists(req, res, service);
      expect(service).toHaveBeenCalledTimes(1);
      expect(service.mock.calls[0][0]).toBe(user.accessToken);
      expect(service.mock.calls[0][1]).toBeInstanceOf(Function);
    });

    it('returns top artists in callback', () => {
      const callback = statsController.getUsersTopArtistsCallback(res);
      callback(null, response);
      expect(responseValue).toBe(response.body.items);
    });

    it('returns bad gateway error when service returns error', () => {
      const callback = statsController.getUsersTopArtistsCallback(res);
      callback(error, response);
      expect(statusValue).toBe(httpStatus.BAD_GATEWAY);
      expect(responseValue.error).toBe(error);
    });

    it('returns bad gateway error when Spotifys response is unexpected', () => {
      const callback = statsController.getUsersTopArtistsCallback(res);
      response.body = {};
      callback(null, response);
      expect(statusValue).toBe(httpStatus.BAD_GATEWAY);
      expect(responseValue.error).toBe(UNEXPECTED_SPOTIFY_RESPONSE);
    });
  });
});
