var models = require('./index')

var worlds = require('../../data/worlds.json')

function generate () {
  return models.generate(worlds)
}

module.exports = {
  'worlds': worlds,
  generate
}
