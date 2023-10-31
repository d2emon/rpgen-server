const defaultData = require('../data/nested');
const selectItem = require('../helpers/selectItem');
const createNestedFactory = require('./factories/thing/nestedFactory');

function createListFactory (options) {
  const {
    data,
    selector,
  } = options;
  const items = selector(options.data);
  return (value) => (value || selectItem(items));  
}

module.exports = (options) => createListFactory({
  data: defaultData,
  ...options,
});
