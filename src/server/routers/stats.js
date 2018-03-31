const express = require('express');

const { spotifyRequests } = require('./../schemas');
const { spotifyService } = require('./../services');
const { userLoggedIn, validateSchema } = require('./../middlewares');

const getRouter = (controller) => {
  /**
   * @swagger
   * tags:
   *   name: Stats
   */
  const router = express.Router();

  /**
   * @swagger
   * /api/stats/topArtists:
   *   post:
   *     tags:
   *       - Stats
   *     description: Retrieve from Spotify user's top artists
   *     parameters:
   *       - in: cookie
   *         name: session
   *         description: Session cookie signed
   *         default: Set it in the browser, leave this field as it is
   *         schema:
   *           type: string
   *       - in: cookie
   *         name: session.sig
   *         description: Signature key for the Session cookie
   *         default: Set it in the browser, leave this field as it is
   *         schema:
   *           type: string
   *       - in: body
   *         name: body
   *         description: Artists fetching options
   *         schema:
   *           $ref: "#/definitions/TopArtistsOptions"
   *     responses:
   *       200:
   *         description: List of user's top artists
   *         schema:
   *           $ref: '#/definitions/Artists'
   *       400:
   *         description: Bad request
   *         schema:
   *           $ref: '#/definitions/Error'
   *       401:
   *         description: No user found
   *       502:
   *         description: Error retrieving artists from Spotify
   *         schema:
   *           $ref: '#/definitions/Error'
   */
  router.post(
    '/topArtists',
    userLoggedIn,
    validateSchema(spotifyRequests.topArtistsOptions, '/stats/topArtists'),
    (req, res) =>
      controller.topArtists(req, res, spotifyService.getUsersTopArtists),
  );

  return router;
};

module.exports = getRouter;
