import { statsApi } from './../../../app/api';

describe('App API - Stats', () => {
  let fetch;
  beforeEach(() => {
    fetch = jest.fn();
    global.fetch = fetch;
  });

  describe('Top Artists', () => {
    it('fetches /api/stats/topArtists as a POST', () => {
      const body = { body: 'example' };
      statsApi.topArtists.post(body);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/stats/topArtists',
        {
          body: JSON.stringify(body),
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      ]);
    });
  });
});
