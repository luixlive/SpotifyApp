const express = require('express');
const passport = require('passport');

const { authenticationController } = require('./../controllers');

const router = express.Router();

router.get('/logout', authenticationController.logout);
router.get('/spotify', passport.authenticate('spotify'));
router.get('/spotify/callback', passport.authenticate('spotify', {
  failureRedirect: '/',
}), authenticationController.spotifyCallback);
router.get('/user', authenticationController.user);

module.exports = router;
