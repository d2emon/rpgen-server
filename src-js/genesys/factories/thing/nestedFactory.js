// from .proxy_factory import ProxyFactory
const childFactory = require('../../../helpers/childFactory');
const createModelFactory = require('../model');

const ProxyFactory = () => ({
  nested: () => ({
    multiple: () => ({}),
    probable: () => ({}),
  }),
});

const valuesFactory = (groups) => groups
  .reduce(
    (result, group) => (group
      ? group()
        .reduce(
          (groupResult, children) => ([
            ...groupResult,
            ...children,
          ]),
          result,
        )
      : result
    ),
    [],
  );

const optionsFactory = (groups) => Object
  .keys(groups)
  .reduce(
    (data, groupId) => ({
      ...data,
      [groupId]: groups[groupId],
    }),
    {},
  );

/*
Nested model Factory.

Attributes:
    default_model (Model): Default model class.
    default_name (str): Default model name.
    default_children (list[Factory]): Default model children factories.
*/

function createNestedFactory (options) {
  const {
    nameFactory,
    children = [],
    childGroups = {},
  } = options;
  const name = nameFactory ? nameFactory(options) : null;

  // Model factories

  const modelFactory = (data) => ({
    ...data,
  });

  const modelOptionsFactory = (data) => ({
    name,
    children: optionsFactory(childGroups),
    ...data,
    values: (options.values || valuesFactory(children)),
  });

  // Builder

  return createModelFactory({
    model: modelFactory,
    options: modelOptionsFactory,
    ...options,
  });
}

// List generators

const one = ProxyFactory.nested;
const multiple = (minItems, maxItems) => one().multiple(minItems, maxItems);
const probable = (probability) => one().probable(probability);

module.exports = createNestedFactory;
