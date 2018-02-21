const config = require('config');
const winston = require('winston');

const logLevel = config.get('LOG_LEVEL');

const consoleTransport = new (winston.transports.Console)({
  colorize: true,
  exitOnError: false,
  level: logLevel,
  prettyPrint: true,
  timestamp: true,
});
const environment = config.get('NODE_ENV');
const fileTransport = new (winston.transports.File)({
  exitOnError: false,
  filename: config.get('LOG_FILE'),
  json: false,
  level: logLevel,
  timestamp: true,
});
let transports = [];

if (environment === 'development') {
  transports = transports.concat([consoleTransport, fileTransport]);
} else if (environment === 'test') {
  transports.push(fileTransport);
} else {
  transports.push(consoleTransport);
}

const logger = new (winston.Logger)({ transports });

logger.info('Logger started');

module.exports = logger;
