import injectOptionsAsQuery from './util/inject_options_as_query';

export default {
  topArtists: {
    get: options => window.fetch(
      injectOptionsAsQuery('/api/stats/topArtists', options),
      {
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      },
    ),
  },
};
