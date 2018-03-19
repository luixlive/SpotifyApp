const config = require('config');
const swaggerJSDocConfiguration = require('swagger-jsdoc');

const swaggerDefault = (req, res) => res.redirect('/swagger/api-docs');

const swaggerJSDoc = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerJSDocConfiguration({
    swaggerDefinition: {
      info: {
        title: config.get('APP_TITLE'),
        version: process.env.npm_package_version,
        description: config.get('APP_DESCRIPTION'),
      },
    },
    apis: ['./src/server/routers/*.js'],
  }));
};

module.exports = {
  swaggerDefault,
  swaggerJSDoc,
};
