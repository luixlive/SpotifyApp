const _ = require('lodash');
const config = require('config');
const request = require('superagent');

const SPOTIFY_API_URL = config.get('SPOTIFY_API_URL');
const { TOP_ARTISTS, TOP_TRACKS } = config.get('CONSTANTS');

const injectQueryParams = (url, options, optionsSchema) => {
  let finalUrl = `${url}?`;
  optionsSchema.forEach((option) => {
    if (option in options) {
      finalUrl += `${option}=${options[option]}&`;
    }
  });

  return finalUrl.slice(0, -1);
};

const getTopArtistsOrTracks = type => (accessToken, options, callback) => {
  const cleanOptions = _.mapKeys(options, (value, key) => {
    if (key === 'timeRange') {
      return 'time_range';
    }
    return key;
  });

  const { ENDPOINT, OPTIONS } = config.get('SPOTIFY_API_ENDPOINTS')[type];
  const requestUri = injectQueryParams(
    `${SPOTIFY_API_URL}${ENDPOINT}`,
    cleanOptions,
    OPTIONS,
  );

  request
    .get(requestUri)
    .set('Authorization', `Bearer ${accessToken}`)
    .end(callback);
};

const refreshAccessToken = (refreshToken, callback) => {
  const { ENDPOINT } = config.get('SPOTIFY_API_ENDPOINTS').REFRESH_ACCESS_TOKEN;
  const SPOTIFY_ACCOUNTS_URL = config.get('SPOTIFY_ACCOUNTS_URL');
  const SPOTIFY_CLIENT_ID = config.get('SPOTIFY_CLIENT_ID');
  const SPOTIFY_CLIENT_SECRET = config.get('SPOTIFY_CLIENT_SECRET');

  const encodedClientInfo = Buffer
    .from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
    .toString('base64');

  request
    .post(`${SPOTIFY_ACCOUNTS_URL}${ENDPOINT}`)
    .send({ grant_type: 'refresh_token', refresh_token: refreshToken })
    .set('Authorization', `Basic ${encodedClientInfo}`)
    .end(callback);
};

module.exports = {
  getUsersTopArtists: getTopArtistsOrTracks(TOP_ARTISTS),
  getUsersTopTracks: getTopArtistsOrTracks(TOP_TRACKS),
  refreshAccessToken,
};
