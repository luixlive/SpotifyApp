import _ from 'lodash';

import {
  configurePassport,
  spotifyStrategyCallback,
} from './../../../server/services/passport';
import emptyFunction from './../../test_utils/empty_function';
import { mockUser, mockSpotifyUser } from './../../test_utils/mock_data';

describe('Server Services - Passport', () => {
  const passport = {};
  beforeEach(() => {
    passport.serializeUser = emptyFunction;
    passport.deserializeUser = emptyFunction;
    passport.use = emptyFunction;
  });

  describe('Configures serializeUser', () => {
    it('calls the function serializeUser', () => {
      passport.serializeUser = jest.fn();
      configurePassport(passport);
      expect(passport.serializeUser).toHaveBeenCalledTimes(1);
    });

    it('calls done with no errors and session values stringified', () => {
      passport.serializeUser = jest.fn();
      configurePassport(passport);

      const done = jest.fn();
      const user = _.cloneDeep(mockUser);
      passport.serializeUser.mock.calls[0][0](user, done);
      expect(done).toHaveBeenCalledTimes(1);
      expect(done.mock.calls[0][0]).toBeNull();
      expect(JSON.parse(done.mock.calls[0][1])).toEqual(user);
    });
  });

  describe('Configures deserializeUser', () => {
    it('calls the function deserializeUser', () => {
      passport.deserializeUser = jest.fn();
      configurePassport(passport);
      expect(passport.deserializeUser).toHaveBeenCalledTimes(1);
    });

    it('calls done with no errors and session values parsed', () => {
      passport.deserializeUser = jest.fn();
      configurePassport(passport);

      const done = jest.fn();
      const user = _.cloneDeep(mockUser);
      passport.deserializeUser.mock.calls[0][0](JSON.stringify(user), done);
      expect(done).toHaveBeenCalledTimes(1);
      expect(done.mock.calls[0][0]).toBeNull();
      expect(done.mock.calls[0][1]).toEqual(user);
    });
  });

  describe('Configures use', () => {
    it('calls the function use', () => {
      passport.use = jest.fn();
      configurePassport(passport);
      expect(passport.use).toHaveBeenCalledTimes(1);
    });

    it('calls done with no errors and session values', () => {
      const done = jest.fn();
      const {
        accessToken,
        expiresIn,
        profile,
        refreshToken,
      } = _.cloneDeep(mockSpotifyUser);

      spotifyStrategyCallback(
        accessToken,
        refreshToken,
        expiresIn,
        profile,
        done,
      );
      expect(done).toHaveBeenCalledTimes(1);
      expect(done.mock.calls[0][0]).toBeNull();
      expect(_.omit(done.mock.calls[0][1], 'expires')).toEqual({
        accessToken,
        refreshToken,
        profile: mockUser.profile,
      });
      expect(done.mock.calls[0][1].expires)
        .toBeGreaterThanOrEqual(Date.now() + expiresIn);
    });
  });
});
