var models = require('./index')

var worlds = [
  'World01',
  'World02',
  'World03',
  'World04',
  'World05'
]

function generate () {
  return models.generate(worlds)
}

module.exports = {
  'worlds': worlds,
  generate
}
