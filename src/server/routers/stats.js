const express = require('express');

const { spotifyService } = require('./../services');

const getRouter = (controller) => {
  const router = express.Router();

  router.get(
    '/topArtists',
    (req, res) =>
      controller.topArtists(req, res, spotifyService.getUsersTopArtists),
  );

  return router;
};

module.exports = getRouter;
