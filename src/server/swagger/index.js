const controller = require('./controller');

const router = require('./router')(controller);

module.exports = router;
