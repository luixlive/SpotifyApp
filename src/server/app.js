const config = require('config');
const express = require('express');

const logger = require('./../utils/logger');

const app = express();

logger.info(`Spotify App started in ${config.util.getEnv('NODE_ENV')} mode`);

app.get('/test', (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
