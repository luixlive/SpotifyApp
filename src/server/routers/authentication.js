const express = require('express');
const passport = require('passport');

const getRouter = (controller) => {
  const router = express.Router();

  router.get('/logout', controller.logout);
  router.get('/spotify', passport.authenticate('spotify'));
  router.get('/spotify/callback', passport.authenticate('spotify', {
    failureRedirect: '/',
  }), controller.spotifyCallback);
  router.get('/user', controller.user);

  return router;
};

module.exports = getRouter;
