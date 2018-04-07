const config = require('config');
const express = require('express');
const passport = require('passport');

const { userLoggedIn } = require('./../middlewares');

const getRouter = (controller) => {
  /**
   * @swagger
   * tags:
   *   name: Authentication
   */
  const router = express.Router();

  /**
   * @swagger
   * /api/authentication/logout:
   *   post:
   *     tags:
   *       - Authentication
   *     description: Logout from Spotify
   *     parameters:
   *       - $ref: '#/parameters/SessionCookie'
   *       - $ref: '#/parameters/SignatureCookie'
   *     responses:
   *       204:
   *         $ref: '#/responses/NoContent'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router.post('/logout', userLoggedIn, controller.logout);

  // TODO: Swagger docs
  router.get('/keepSessionAlive', userLoggedIn, controller.keepSessionAlive);

  /**
   * @swagger
   * /api/authentication/spotify:
   *   get:
   *     tags:
   *       - Authentication
   *     description: Get redirected to Spotify's login page, after login event
   *                  /api/authentication/spotify/callback will be called
   */
  router.get('/spotify', passport.authenticate('spotify', {
    scope: config.get('SPOTIFY_AUTHORIZATION_SCOPE'),
  }));

  router.get('/spotify/callback', passport.authenticate('spotify', {
    failureRedirect: '/',
  }), userLoggedIn, controller.spotifyCallback);

  /**
   * @swagger
   * /api/authentication/user:
   *   get:
   *     tags:
   *       - Authentication
   *     description: Retrieve current user (if there is one)
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/SessionCookie'
   *       - $ref: '#/parameters/SignatureCookie'
   *     responses:
   *       200:
   *         $ref: '#/responses/OK'
   *         schema:
   *           $ref: '#/definitions/User'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router.get('/user', userLoggedIn, controller.user);

  return router;
};

module.exports = getRouter;
