if (process.env.NODE_ENV === 'production') {
    module.exports = require('./config.prod'); // eslint-disable-line global-require
} else {
    module.exports = require('./config.dev'); // eslint-disable-line global-require
}
