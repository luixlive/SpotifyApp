const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');

const getUsersTopArtistsCallback = res => (err, spotifyRes) => {
  if (err) {
    logger.debug(`Spotify getUsersTopArtists error: ${err}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.send({ error: err });
  }

  // TODO: Add validation for spotifyRes.body.items
  logger.debug(`Spotify getUsersTopArtists: ${JSON.stringify(spotifyRes)}`);
  return res.send(spotifyRes.body.items);
};

const topArtists = (req, res, getUsersTopArtists) => {
  logger.debug(`api/stats/topArtists: ${JSON.stringify(req.user)}`);
  getUsersTopArtists(req.user.accessToken, getUsersTopArtistsCallback(res));
};

module.exports = {
  getUsersTopArtistsCallback,
  topArtists,
};
