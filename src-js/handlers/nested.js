const factories = require('../genesys/nested');

async function nestedHandler (req, res) {
  const count = req.query.count || 1;

  const {
    multiverse,
  } = factories;

  const promises = []
  for (let i=0; i < count; i++) {
    promises.push(multiverse());
  }

  const result = await Promise.all(promises);

  return res.json({
    result,
  });
};

module.exports = {
  nestedHandler,
};
