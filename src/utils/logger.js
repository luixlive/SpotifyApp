const config = require('config');
const winston = require('winston');

const logLevel = config.get('LOG_LEVEL');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      exitOnError: false,
      level: logLevel,
      prettyPrint: true,
      timestamp: true,
    }),
    new (winston.transports.File)({
      exitOnError: false,
      filename: config.get('LOG_FILE'),
      json: false,
      level: logLevel,
      timestamp: true,
    }),
  ],
});

logger.info('Logger started');

module.exports = logger;
