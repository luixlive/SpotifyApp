const config = require('config');
const express = require('express');
const passport = require('passport');

const getRouter = (controller) => {
  const router = express.Router();

  /**
   * @swagger
   * /api/authentication/logout:
   *   get:
   *     description: Logout from Spotify
   *     parameters:
   *       - in: cookie
   *         name: session
   *         description: Session cookie signed
   *         schema:
   *           type: string
   *       - in: cookie
   *         name: session.sig
   *         description: Signature key for the Session cookie
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: User logged out (if there was a session)
   */
  router.get('/logout', controller.logout);

  /**
   * @swagger
   * /api/authentication/spotify:
   *   get:
   *     description: Get redirected to Spotify's login page, after login event
   *                  /api/authentication/spotify/callback will be called
   */
  router.get('/spotify', passport.authenticate('spotify', {
    scope: config.get('SPOTIFY_AUTHORIZATION_SCOPE'),
  }));

  router.get('/spotify/callback', passport.authenticate('spotify', {
    failureRedirect: '/',
  }), controller.spotifyCallback);

  /**
   * @swagger
   * /api/authentication/user:
   *   get:
   *     description: Retrieve current user (if there is one)
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: cookie
   *         name: session
   *         description: Session cookie signed
   *         schema:
   *           type: string
   *       - in: cookie
   *         name: session.sig
   *         description: Signature key for the Session cookie
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User found and returned
   *         schema:
   *           $ref: '#/definitions/User'
   *       401:
   *         description: No user found
   */
  router.get('/user', controller.user);

  return router;
};

module.exports = getRouter;
