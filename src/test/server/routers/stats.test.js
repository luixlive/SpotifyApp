import getRouter from './../../../server/routers/stats';
import handleRouterRequest from './../../test_utils/handle_router_request';

describe('Server Routers - Stats', () => {
  let controller;
  let router;
  let topArtistsController;
  let topTracksController;
  beforeAll(() => {
    topArtistsController = jest.fn();
    topTracksController = jest.fn();
    controller = {
      topArtists: () => topArtistsController,
      topTracks: () => topTracksController,
    };
    router = getRouter(controller);
  });

  it('calls getArtists controller', () => {
    const req = { method: 'GET', url: '/topArtists' };
    handleRouterRequest(router, req, null, true);
    expect(topArtistsController).toHaveBeenCalledTimes(1);
  });

  it('calls getTracks controller', () => {
    const req = { method: 'GET', url: '/topTracks' };
    handleRouterRequest(router, req, null, true);
    expect(topTracksController).toHaveBeenCalledTimes(1);
  });
});
