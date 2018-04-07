const _ = require('lodash');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');

const { UNEXPECTED_SPOTIFY_RESPONSE } = require('./../util/error_responses');

const logout = (req, res) => {
  logger.debug(`api/authentication/logout: ${req.logUser}`);
  req.logout();
  req.session = null;
  res.sendStatus(httpStatus.NO_CONTENT);
};

const keepSessionAlive = (req, res, service) => {
  logger.debug(`api/authentication/keepSessionAlive: ${req.logUser}`);
  const oneMinuteFromNow = Date.now() + (60 * 1000);
  if (oneMinuteFromNow >= req.user.expires) {
    service(req.user.refreshToken, (err, spotifyResponse) => {
      const body = _.get(spotifyResponse, 'body', {});
      if (err || !body.access_token || !body.expires_in) {
        logger.debug(
          'Spotify keepSessionAlive error: ',
          err || UNEXPECTED_SPOTIFY_RESPONSE,
        );
        res.status(httpStatus.BAD_GATEWAY);
        return res.send({ error: err || UNEXPECTED_SPOTIFY_RESPONSE });
      }

      req.user.accessToken = body.access_token;
      req.user.expires = Date.now() + (body.expires_in * 1000);
      return res.send(httpStatus.NO_CONTENT);
    });
  } else {
    res.sendStatus(httpStatus.NO_CONTENT);
  }
};

const spotifyCallback = (req, res) => {
  logger.debug('api/authentication/spotify/callback: ', req.logUser);
  res.redirect('/');
};

const user = (req, res) => {
  logger.debug(`api/authentication/user: ${req.logUser}`);
  res.send(req.user.profile);
};

module.exports = {
  keepSessionAlive,
  logout,
  spotifyCallback,
  user,
};
