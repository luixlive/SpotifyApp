import authenticationApi from './../../../app/api';

describe('App API - Authentication', () => {
  let fetch;
  beforeEach(() => {
    fetch = jest.fn();
    global.fetch = fetch;
  });

  describe('User', () => {
    it('fetches /api/authentication/user as a GET', () => {
      authenticationApi.user.get();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/authentication/user',
        { method: 'GET' },
      ]);
    });
  });

  describe('Logout', () => {
    it('fetches /api/authentication/logout as a GET', () => {
      authenticationApi.logout.get();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/authentication/logout',
        { method: 'GET' },
      ]);
    });
  });
});
