import { statsApi } from './../../../app/api';

describe('App API - Stats', () => {
  let fetch;
  beforeEach(() => {
    fetch = jest.fn();
    global.fetch = fetch;
  });

  describe('Top Artists', () => {
    it('fetches /api/stats/topArtists as a GET', () => {
      statsApi.topArtists.get();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/stats/topArtists',
        { credentials: 'same-origin', method: 'GET' },
      ]);
    });
  });
});
