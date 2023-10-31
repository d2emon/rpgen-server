const debug = require('debug');
const config = require('./config');

const {
  DEBUG,
} = config;

module.exports = logger => debug(`${DEBUG}:${logger}`);
