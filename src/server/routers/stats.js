const config = require('config');
const express = require('express');

const { spotifyRequests } = require('./../schemas');
const { spotifyService } = require('./../services');
const { userLoggedIn, validateSchema } = require('./../middlewares');

const SCHEMA_TYPES = config.get('SCHEMA_TYPES');

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
   *   get:
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
   *       - in: query
   *         name: limit
   *         description: Number of artists (minimum 1, maximum 50)
   *         default: 5
   *         type: number
   *         format: int32
   *         minimum: 1
   *         maximum: 50
   *       - in: query
   *         name: offset
   *         description: Offset value (minimum 0)
   *         default: 0
   *         type: number
   *         format: int32
   *         minimum: 0
   *       - in: query
   *         name: timeRange
   *         description: Time range to take into account
   *           artists
   *         type: string
   *         default: medium_term
   *         enum: [long_term, medium_term, short_term]
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
  router.get(
    '/topArtists',
    userLoggedIn,
    validateSchema(
      spotifyRequests.topArtistsOptions,
      '/stats/topArtists',
      SCHEMA_TYPES.TYPE_QUERY,
    ),
    (req, res) => controller.topArtists(
      req,
      res,
      spotifyService.getUsersTopArtists,
    ),
  );

  return router;
};

module.exports = getRouter;
