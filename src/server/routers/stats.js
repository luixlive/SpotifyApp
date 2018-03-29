const express = require('express');

const { spotifyService } = require('./../services');
const { userLoggedIn } = require('./../middlewares');

const getRouter = (controller) => {
  const router = express.Router();

  /**
   * @swagger
   * /api/stats/topArtists:
   *   get:
   *     description: Retrieve from Spotify user's top artists
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
   *         description: List of user's top artists
   *         schema:
   *           $ref: '#/definitions/Artists'
   *       502:
   *         description: Error retrieving artists from Spotify
   */
  router.get(
    '/topArtists',
    userLoggedIn,
    (req, res) =>
      controller.topArtists(req, res, spotifyService.getUsersTopArtists),
  );

  return router;
};

module.exports = getRouter;
