// from models.model import Model
const childFactory = require('../../helpers/childFactory');

const Model = (options) => ({...options});
/*
const {
  args,
  data,
} = options;
*/

const defaults = {
  model: Model,
  data: (options) => ({...options}),
};
  
const createModelFactory = (factories) => (options) => {
  const {
    model,
  } = options;

  const data = factories.options(options);

  return model
    ? model(data)
    : factories.model(data);
}

module.exports = createModelFactory;
