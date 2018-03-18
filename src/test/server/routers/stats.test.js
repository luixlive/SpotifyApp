import getRouter from './../../../server/routers/stats';

describe('Server Routers - Stats', () => {
  let controller;
  let router;
  beforeAll(() => {
    controller = { topArtists: jest.fn() };
    router = getRouter(controller);
  });

  it('calls getArtists controller', () => {
    const request = { url: '/topArtists', method: 'GET' };
    router.handle(request);
    expect(controller.topArtists).toHaveBeenCalledTimes(1);
  });
});
