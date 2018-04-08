import _ from 'lodash';

import { authenticationController } from './../../../server/controllers';
import error from './../../test_utils/error';
import httpStatus from './../../../utils/http_status';
import {
  mockSpotifyRefreshToken,
  mockUser,
  mockSpotifyUser,
} from './../../test_utils/mock_data';
import {
  UNEXPECTED_SPOTIFY_RESPONSE,
} from './../../../server/util/error_responses';

describe('Server Controllers - Authentication', () => {
  let req;
  let res;
  let redirectTo;
  let responseValue;
  let statusValue;
  let user;
  beforeEach(() => {
    redirectTo = undefined;
    responseValue = undefined;
    statusValue = undefined;
    user = _.cloneDeep(mockUser);
    req = {
      logout: () => { user = undefined; },
      session: { passport: { user: JSON.stringify(user) } },
      user,
    };
    res = {
      redirect: (path) => { redirectTo = path; },
      send: (value) => { responseValue = value; },
      sendStatus: (status) => { statusValue = status; },
      status: (status) => { statusValue = status; },
    };
  });

  describe('Logout', () => {
    it('logs out user', () => {
      authenticationController.logout(req, res);
      expect(statusValue).toEqual(httpStatus.NO_CONTENT);
      expect(responseValue).toBeUndefined();
      expect(user).toBeUndefined();
      expect(req.session).toBeNull();
    });
  });

  describe('Keep Session Alive', () => {
    let response;
    beforeEach(() => {
      user.expires = Date.now() - 1000;
      req.session.user = JSON.stringify(user);
      response = { body: _.cloneDeep(mockSpotifyRefreshToken) };
    });

    it('returns NO CONTENT status if session is alive', () => {
      user.expires = Date.now() + (60 * 60 * 1000);
      req.session.user = JSON.stringify(user);
      const service = jest.fn();
      authenticationController.keepSessionAlive(service)(req, res);
      expect(service).toHaveBeenCalledTimes(0);
      expect(statusValue).toEqual(httpStatus.NO_CONTENT);
    });

    it('calls service to refresh token if session expired', () => {
      const service = jest.fn();
      authenticationController.keepSessionAlive(service)(req, res);
      expect(service).toHaveBeenCalledTimes(1);
      expect(service.mock.calls[0][0]).toBe(user.refreshToken);
      expect(service.mock.calls[0][1]).toBeInstanceOf(Function);
    });

    it('returns NO CONTENT status if session was updated', () => {
      const mockService = (token, callback) => {
        callback(null, response);
      };
      authenticationController.keepSessionAlive(mockService)(req, res);
      expect(statusValue).toEqual(httpStatus.NO_CONTENT);
    });

    it('returns bad gateway error when service returns error', () => {
      const mockService = (token, callback) => {
        callback(error, null);
      };
      authenticationController.keepSessionAlive(mockService)(req, res);
      expect(statusValue).toBe(httpStatus.BAD_GATEWAY);
      expect(responseValue.error).toBe(error);
    });

    it('returns bad gateway error when Spotifys response is unexpected', () => {
      const mockService = (token, callback) => {
        callback(null, null);
      };
      authenticationController.keepSessionAlive(mockService)(req, res);
      expect(statusValue).toBe(httpStatus.BAD_GATEWAY);
      expect(responseValue.error).toBe(UNEXPECTED_SPOTIFY_RESPONSE);
    });
  });

  describe('Spotify Callback', () => {
    it('redirects to /', () => {
      req.user = _.cloneDeep(mockSpotifyUser);
      authenticationController.spotifyCallback(req, res);
      expect(redirectTo).toEqual('/');
    });
  });

  describe('User', () => {
    it('returns user', () => {
      authenticationController.user(req, res);
      expect(responseValue).toBe(req.user.profile);
    });
  });
});
