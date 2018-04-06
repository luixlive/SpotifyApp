import { statsApi } from './../../../app/api';

describe('App API - Stats', () => {
  let fetch;
  beforeEach(() => {
    fetch = jest.fn();
    global.fetch = fetch;
  });

  describe('Top Artists', () => {
    it('fetches /api/stats/topArtists as a GET', () => {
      const query = { key: 'value' };
      statsApi.topArtists.get(query);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/stats/topArtists?key=value',
        { credentials: 'same-origin', method: 'GET' },
      ]);
    });
  });

  describe('Top Tracks', () => {
    it('fetches /api/stats/topTracks as a GET', () => {
      const query = { key: 'value' };
      statsApi.topTracks.get(query);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0]).toEqual([
        '/api/stats/topTracks?key=value',
        { credentials: 'same-origin', method: 'GET' },
      ]);
    });
  });
});
