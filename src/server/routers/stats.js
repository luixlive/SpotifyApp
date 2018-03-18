const express = require('express');

const { spotifyService } = require('./../services');

const getRouter = (controller) => {
  const router = express.Router();

  router.get(
    '/topArtists',
    (req, res) => controller.topArtists(req, res, spotifyService),
  );

  return router;
};

module.exports = getRouter;
