const config = require('config');
const express = require('express');

const { spotifyRequests } = require('./../schemas');
const { spotifyService } = require('./../services');
const {
  sessionAlive,
  userLoggedIn,
  validateSchema,
} = require('./../middlewares');

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
   *       - $ref: '#/parameters/SessionCookie'
   *       - $ref: '#/parameters/SignatureCookie'
   *       - $ref: '#/parameters/ItemsLimit'
   *       - $ref: '#/parameters/ItemsOffset'
   *       - $ref: '#/parameters/ItemsTimeRange'
   *     responses:
   *       200:
   *         $ref: '#/responses/OK'
   *         schema:
   *           $ref: '#/definitions/Artists'
   *       400:
   *         $ref: '#/responses/BadRequest'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       502:
   *         $ref: '#/responses/BadGateway'
   */
  router.get(
    '/topArtists',
    userLoggedIn,
    sessionAlive,
    validateSchema(
      spotifyRequests.topArtistsOrTracksOptions,
      '/stats/topArtists',
      SCHEMA_TYPES.TYPE_QUERY,
    ),
    controller.topArtists(spotifyService.getUsersTopArtists),
  );

  /**
   * @swagger
   * /api/stats/topTracks:
   *   get:
   *     tags:
   *       - Stats
   *     description: Retrieve from Spotify user's top tracks
   *     parameters:
   *       - $ref: '#/parameters/SessionCookie'
   *       - $ref: '#/parameters/SignatureCookie'
   *       - $ref: '#/parameters/ItemsLimit'
   *       - $ref: '#/parameters/ItemsOffset'
   *       - $ref: '#/parameters/ItemsTimeRange'
   *     responses:
   *       200:
   *         $ref: '#/responses/OK'
   *         schema:
   *           $ref: '#/definitions/Tracks'
   *       400:
   *         $ref: '#/responses/BadRequest'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       502:
   *         $ref: '#/responses/BadGateway'
   */
  router.get(
    '/topTracks',
    userLoggedIn,
    sessionAlive,
    validateSchema(
      spotifyRequests.topArtistsOrTracksOptions,
      '/stats/topTracks',
      SCHEMA_TYPES.TYPE_QUERY,
    ),
    controller.topTracks(spotifyService.getUsersTopTracks),
  );

  return router;
};

module.exports = getRouter;
