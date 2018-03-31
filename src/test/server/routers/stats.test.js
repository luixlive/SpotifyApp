import getRouter from './../../../server/routers/stats';
import handleRouterRequest from './../../test_utils/handle_router_request';

describe('Server Routers - Stats', () => {
  let controller;
  let router;
  beforeAll(() => {
    controller = { topArtists: jest.fn() };
    router = getRouter(controller);
  });

  it('calls getArtists controller', () => {
    const req = { method: 'POST', url: '/topArtists' };
    handleRouterRequest(router, req, null, true);
    expect(controller.topArtists).toHaveBeenCalledTimes(1);
  });
});
