import injectOptionsAsQuery from './util/inject_options_as_query';

export default {
  topArtists: {
    get: options => window.fetch(
      injectOptionsAsQuery('/api/stats/topArtists', options),
      {
        credentials: 'same-origin',
        method: 'GET',
      },
    ),
  },
  topTracks: {
    get: options => window.fetch(
      injectOptionsAsQuery('/api/stats/topTracks', options),
      {
        credentials: 'same-origin',
        method: 'GET',
      },
    ),
  },
};
