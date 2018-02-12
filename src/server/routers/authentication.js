const express = require('express');
const passport = require('passport');

const logger = require('./../../utils/logger');

const router = express.Router();

router.get('/spotify', passport.authenticate('spotify'));

router.get('/spotify/callback', passport.authenticate('spotify', {
  failureRedirect: '/login',
}), (req, res) => {
  logger.debug(`api/authentication/spotify/callback: ${req.user}`);
  res.redirect('/stats');
});

router.get('/logout', (req, res) => {
  logger.debug(`api/authentication/logout: ${req.user}`);
  req.logout();
  res.redirect('/');
});

router.get('/user', (req, res) => {
  logger.debug(`api/authentication/user: ${req.user}`);
  res.send(req.user);
});

module.exports = router;
