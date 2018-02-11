const config = require('config');
const express = require('express');
const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
/* eslint-enable import/no-extraneous-dependencies */

const logger = require('./../utils/logger');
const webpackConfig = require('./../../webpack.config');

const app = express();
const environment = config.util.getEnv('NODE_ENV');

logger.info(`Spotify App started in ${config.util.getEnv('NODE_ENV')} mode`);

if (environment === 'development') {
  const webpackCompiler = webpack(webpackConfig);

  app.use(webpackMiddleware(webpackCompiler, {}));
  app.use(webpackHotMiddleware(webpackCompiler));
} else if (environment === 'test') {
  app.get('/test', (req, res) => {
    res.sendStatus(200);
  });
} else {
  app.use(express.static(path.join(__dirname, './../../dist')));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../../dist', 'index.html'));
});

module.exports = app;
