import { statsApi } from './../../../app/api';

describe('App API - Stats', () => {
  let fetch;
  beforeEach(() => {
    fetch = jest.fn();
    global.fetch = fetch;
  });

  describe('Top Artists', () => {
    it('fetches /api/stats/topArtists as a POST', () => {
      const query = { key: 'value' };
      statsApi.topArtists.get(query);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/stats/topArtists?key=value',
        {
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        },
      ]);
    });
  });
});
