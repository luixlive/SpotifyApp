import _ from 'lodash';

import { authenticationController } from './../../../server/controllers';
import httpStatus from './../../../utils/http_status';
import { mockUser, mockSpotifyUser } from './../../test_utils/mock_data';

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
      session: 'session',
      user,
    };
    res = {
      redirect: (path) => { redirectTo = path; },
      send: (value) => { responseValue = value; },
      sendStatus: (status) => { statusValue = status; },
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
