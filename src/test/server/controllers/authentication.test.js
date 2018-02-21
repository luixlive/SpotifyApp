import { authenticationController } from './../../../server/controllers';

describe('Server Controllers - Authentication', () => {
  let req;
  let res;
  let redirectTo;
  let responseValue;
  let user;
  beforeEach(() => {
    user = 'user';
    req = {
      logout: () => { user = undefined; },
      user,
    };
    res = {
      redirect: (path) => { redirectTo = path; },
      send: (value) => { responseValue = value; },
    };
  });

  it('logout', () => {
    authenticationController.logout(req, res);
    expect(redirectTo).toEqual('/');
    expect(user).toBe(undefined);
  });

  it('spotifyCallback', () => {
    authenticationController.spotifyCallback(req, res);
    expect(redirectTo).toEqual('/stats');
  });

  it('user', () => {
    authenticationController.user(req, res);
    expect(responseValue).toBe(req.user);
  });
});
