const express = require('express');

const authenticationRouter = require('./authentication');

const router = express.Router();

router.use('/authentication', authenticationRouter);

module.exports = router;
