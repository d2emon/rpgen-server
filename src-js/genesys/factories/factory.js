const childFactory = require("../../helpers/childFactory");

function createFactory (factories, defaults, factoryOptions) {
  const {
    name = '',
  } = factoryOptions;

  const builder = childFactory('builder', defaults, factories);
  const dataFactory = childFactory('data', defaults, factories);

  function factory (options) {
    const factoryData = dataFactory(data);

    console.log(`Create factory ${name}`);
    console.log(`Data ${factoryData}`);
    console.log(`Options ${options}`);
  
    console.log(`Factory options: ${factoryOptions}`);
    console.log(`Factory data: ${factoryData}`);

    return builder(options);
  }

  return factory;
};
 
function items (itemFactory, count = 1) {
  const result = [];
  for (let i = 0; i < count; i += 1) {
    result.push(itemFactory());
  }
  return result;
}

module.exports = createFactory;
