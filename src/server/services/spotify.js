const _ = require('lodash');
const config = require('config');
const request = require('superagent');

const SPOTIFY_API_URL = config.get('SPOTIFY_API_URL');

const injectQueryParams = (url, options, optionsSchema) => {
  let finalUrl = `${url}?`;
  optionsSchema.forEach((option) => {
    if (option in options) {
      finalUrl += `${option}=${options[option]}&`;
    }
  });

  return finalUrl.slice(0, -1);
};

module.exports = {
  getUsersTopArtists: (accessToken, callback, options) => {
    const cleanOptions = _.mapKeys(options, (value, key) => {
      if (key === 'timeRange') {
        return 'time_range';
      }
      return key;
    });

    const {
      URI: topArtistsEndpoint,
      OPTIONS: optionsSchema,
    } = config.get('SPOTIFY_API_ENDPOINTS').TOP_ARTISTS;

    const requestUri = injectQueryParams(
      `${SPOTIFY_API_URL}${topArtistsEndpoint}`,
      cleanOptions,
      optionsSchema,
    );

    request
      .get(requestUri)
      .set('Authorization', `Bearer ${accessToken}`)
      .end(callback);
  },
};
