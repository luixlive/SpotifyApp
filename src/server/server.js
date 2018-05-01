const config = require('config');

const app = require('./app');
const logger = require('./../utils/logger');

const port = config.get('PORT');

app.listen(port, () => {
  logger.info(`Music Stats listening port: ${port}`);
});
