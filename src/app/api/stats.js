export default {
  topArtists: {
    get: () => window.fetch('/api/stats/topArtists', {
      credentials: 'same-origin',
      method: 'GET',
    }),
  },
};
