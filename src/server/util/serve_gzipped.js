const fs = require('fs');

module.exports = (contentType, path) => (req, res, next) => {
  if (req.acceptsEncodings().indexOf('gzip') !== -1 &&
    fs.existsSync(`${path}/${req.url}.gz`)) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', contentType);
  }

  next();
};
