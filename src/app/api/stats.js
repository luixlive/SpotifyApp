export default {
  topArtists: {
    post: options => window.fetch('/api/stats/topArtists', {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(options),
    }),
  },
};
