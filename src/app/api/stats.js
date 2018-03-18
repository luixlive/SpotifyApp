export default {
  topArtists: {
    get: () => window.fetch('/api/stats/topArtists', { method: 'GET' }),
  },
};
