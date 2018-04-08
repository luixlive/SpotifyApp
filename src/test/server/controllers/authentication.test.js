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
  let user;
  beforeEach(() => {
    user = _.cloneDeep(mockUser);
    req = {
      logout: () => { user = undefined; },
      session: { passport: { user: JSON.stringify(user) } },
      user,
    };
    res = {
      redirect: jest.fn(),
      send: jest.fn(),
      sendStatus: jest.fn(),
      status: jest.fn(),
    };
  });

  describe('Logout', () => {
    it('logs out user', () => {
      authenticationController.logout(req, res);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus.mock.calls[0][0]).toBe(httpStatus.NO_CONTENT);
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
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus.mock.calls[0][0]).toBe(httpStatus.NO_CONTENT);
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
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus.mock.calls[0][0]).toBe(httpStatus.NO_CONTENT);
    });

    it('returns bad gateway error when service returns error', () => {
      const mockService = (token, callback) => {
        callback(error, null);
      };
      authenticationController.keepSessionAlive(mockService)(req, res);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_GATEWAY);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0].error).toBe(error);
    });

    it('returns bad gateway error when Spotifys response is unexpected', () => {
      const mockService = (token, callback) => {
        callback(null, null);
      };
      authenticationController.keepSessionAlive(mockService)(req, res);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status.mock.calls[0][0]).toBe(httpStatus.BAD_GATEWAY);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0].error).toBe(UNEXPECTED_SPOTIFY_RESPONSE);
    });
  });

  describe('Spotify Callback', () => {
    it('redirects to /', () => {
      req.user = _.cloneDeep(mockSpotifyUser);
      authenticationController.spotifyCallback(req, res);
      expect(res.redirect).toHaveBeenCalledTimes(1);
      expect(res.redirect.mock.calls[0][0]).toEqual('/');
    });
  });

  describe('User', () => {
    it('returns user', () => {
      authenticationController.user(req, res);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send.mock.calls[0][0]).toBe(req.user.profile);
    });
  });
});
