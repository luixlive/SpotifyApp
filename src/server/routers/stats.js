const express = require('express');

const getRouter = (controller) => {
  const router = express.Router();

  router.get('/topArtists', controller.topArtists);

  return router;
};

module.exports = getRouter;
