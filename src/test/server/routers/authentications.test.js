import emptyFunction from './../../test_utils/empty_function';
import getRouter from './../../../server/routers/authentication';

describe('Server Routers - Authentication', () => {
  let controller;
  let router;
  beforeAll(() => {
    controller = {
      logout: jest.fn(),
      spotifyCallback: emptyFunction,
      user: jest.fn(),
    };
    router = getRouter(controller);
  });

  it('calls logout controller', () => {
    const request = { url: '/logout', method: 'GET' };
    router.handle(request);
    expect(controller.logout).toHaveBeenCalledTimes(1);
  });

  it('calls user controller', () => {
    const request = { url: '/user', method: 'GET' };
    router.handle(request);
    expect(controller.user).toHaveBeenCalledTimes(1);
  });
});
