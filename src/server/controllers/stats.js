const _ = require('lodash');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');
const { UNEXPECTED_SPOTIFY_RESPONSE } = require('./../util/error_responses');

const getUsersTopArtistsCallback = res => (err, spotifyRes) => {
  if (err || !_.has(spotifyRes, 'body.items')) {
    logger.debug(`Spotify getUsersTopArtists error: ${err || UNEXPECTED_SPOTIFY_RESPONSE}`);
    res.status(httpStatus.BAD_GATEWAY);
    return res.send({ error: err || UNEXPECTED_SPOTIFY_RESPONSE });
  }

  logger.debug(`Spotify getUsersTopArtists: ${JSON.stringify(spotifyRes)}`);
  return res.send(spotifyRes.body.items);
};

const topArtists = (req, res, getUsersTopArtists) => {
  logger.debug(`api/stats/topArtists: ${req.user.profile._json.display_name}`);
  getUsersTopArtists(
    req.user.accessToken,
    getUsersTopArtistsCallback(res),
    req.body,
  );
};

module.exports = {
  getUsersTopArtistsCallback,
  topArtists,
};
