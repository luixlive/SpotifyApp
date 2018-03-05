const express = require('express');

const { authenticationController } = require('./../controllers');

const authenticationRouter =
  require('./authentication')(authenticationController);

const router = express.Router();

router.use('/authentication', authenticationRouter);

module.exports = router;
