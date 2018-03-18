const express = require('express');

const {
  authenticationController,
  statsController,
} = require('./../controllers');

const authenticationRouter =
  require('./authentication')(authenticationController);
const statsRouter =
  require('./stats')(statsController);

const router = express.Router();

router.use('/authentication', authenticationRouter);
router.use('/stats', statsRouter);

module.exports = router;
