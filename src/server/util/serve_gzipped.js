const fs = require('fs');

module.exports = contentType => (req, res, next) => {
  if (req.acceptsEncodings().indexOf('gzip') !== -1 &&
    fs.existsSync(`./dist/${req.url}.gz`)) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', contentType);
  }

  next();
};
