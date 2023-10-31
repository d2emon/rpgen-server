// # from .materials import FACTORIES as MATERIAL_FACTORIES
const universeFactories = require('./universe');
// # from .universe import FACTORIES as UNIVERSE_FACTORIES
// # from .life import FACTORIES as LIFE_FACTORIES

const factories = {
  // **MATERIAL_FACTORIES,
  ...universeFactories,
  // **LIFE_FACTORIES,
};

module.exports = factories;
