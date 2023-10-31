const data = require('../data/nested');
const createNestedFactory = require('./factories/thing/nestedFactory');

module.exports = (options) => createNestedFactory({
  data,
  ...options,
});
