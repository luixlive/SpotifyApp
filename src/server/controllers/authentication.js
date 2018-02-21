const logger = require('./../../utils/logger');

const logout = (req, res) => {
  logger.debug(`api/authentication/logout: ${JSON.stringify(req.user)}`);
  req.logout();
  res.redirect('/');
};

const spotifyCallback = (req, res) => {
  logger.debug(`api/authentication/spotify/callback: ${JSON.stringify(req.user)}`);
  res.redirect('/stats');
};

const user = (req, res) => {
  logger.debug(`api/authentication/user: ${JSON.stringify(req.user)}`);
  res.send(req.user);
};

module.exports = {
  logout,
  spotifyCallback,
  user,
};
