const _ = require('lodash');
const config = require('config');
const request = require('superagent');

const SPOTIFY_API_URL = config.get('SPOTIFY_API_URL');
const TOP_ARTISTS = 'TOP_ARTISTS';
const TOP_TRACKS = 'TOP_TRACKS';

const injectQueryParams = (url, options, optionsSchema) => {
  let finalUrl = `${url}?`;
  optionsSchema.forEach((option) => {
    if (option in options) {
      finalUrl += `${option}=${options[option]}&`;
    }
  });

  return finalUrl.slice(0, -1);
};

const getTopArtistsOrTracks = retrieve => (accessToken, options, callback) => {
  const cleanOptions = _.mapKeys(options, (value, key) => {
    if (key === 'timeRange') {
      return 'time_range';
    }
    return key;
  });

  const {
    URI: topArtistsEndpoint,
    OPTIONS: optionsSchema,
  } = config.get('SPOTIFY_API_ENDPOINTS')[retrieve];

  const requestUri = injectQueryParams(
    `${SPOTIFY_API_URL}${topArtistsEndpoint}`,
    cleanOptions,
    optionsSchema,
  );

  request
    .get(requestUri)
    .set('Authorization', `Bearer ${accessToken}`)
    .end(callback);
};

module.exports = {
  getUsersTopArtists: getTopArtistsOrTracks(TOP_ARTISTS),
  getUsersTopTracks: getTopArtistsOrTracks(TOP_TRACKS),
};
