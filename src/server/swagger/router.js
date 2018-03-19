const express = require('express');
const path = require('path');

const getRouter = (controller) => {
  const router = express.Router();

  router.use('/api-docs', express.static(path.join(__dirname, './ui')));
  router.get('/api-docs.json', controller.swaggerJSDoc);
  router.use('/', controller.swaggerDefault);

  return router;
};

module.exports = getRouter;
