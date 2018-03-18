const logger = require('./../../utils/logger');
const { spotifyService } = require('./../services');

const topArtists = (req, res) => {
  logger.debug(`api/stats/topArtists: ${JSON.stringify(req.user)}`);
  spotifyService.getUsersTopArtists(req.user.accessToken, (err, spotifyRes) => {
    if (err) {
      logger.debug(`Spotify getUsersTopArtists error: ${err}`);
      return res.status(500).send({ error: err });
    }

    logger.debug(`Spotify getUsersTopArtists: ${JSON.stringify(spotifyRes)}`);
    return res.send(spotifyRes);
  });
};

module.exports = { topArtists };
