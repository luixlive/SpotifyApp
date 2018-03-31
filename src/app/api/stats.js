export default {
  topArtists: {
    post: options => window.fetch('/api/stats/topArtists', {
      body: JSON.stringify(options),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }),
  },
};
