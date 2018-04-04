import getRouter from './../../../server/routers/stats';
import handleRouterRequest from './../../test_utils/handle_router_request';

describe('Server Routers - Stats', () => {
  let controller;
  let router;
  beforeAll(() => {
    controller = { topArtists: jest.fn(), topTracks: jest.fn() };
    router = getRouter(controller);
  });

  it('calls getArtists controller', () => {
    const req = { method: 'GET', url: '/topArtists' };
    handleRouterRequest(router, req, null, true);
    expect(controller.topArtists).toHaveBeenCalledTimes(1);
  });

  it('calls getTracks controller', () => {
    const req = { method: 'GET', url: '/topTracks' };
    handleRouterRequest(router, req, null, true);
    expect(controller.topTracks).toHaveBeenCalledTimes(1);
  });
});
