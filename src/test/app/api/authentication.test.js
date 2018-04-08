import { authenticationApi } from './../../../app/api';

describe('App API - Authentication', () => {
  let fetch;
  beforeEach(() => {
    fetch = jest.fn();
    global.fetch = fetch;
  });

  describe('Keep Session Alive', () => {
    it('fetches /api/authentication/keepSessionAlive as a PUT', () => {
      authenticationApi.keepSessionAlive.put();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/authentication/keepSessionAlive',
        { credentials: 'same-origin', method: 'PUT' },
      ]);
    });
  });

  describe('Logout', () => {
    it('fetches /api/authentication/logout as a POST', () => {
      authenticationApi.logout.post();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/authentication/logout',
        { credentials: 'same-origin', method: 'POST' },
      ]);
    });
  });

  describe('User', () => {
    it('fetches /api/authentication/user as a GET', () => {
      authenticationApi.user.get();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/authentication/user',
        { credentials: 'same-origin', method: 'GET' },
      ]);
    });
  });
});
