var getAlien = require('./alien-type')

module.exports = function () {
  var alien = getAlien()
  alien.title = 'амфибии'

  alien.names2c = require('../../../data/alien-amphibian-parts-3.json'),
  alien.names11 = ["It's covered in a thin layer of mucous.","It's covered in a thick layer of mucous.","It's covered in a very thin layer of mucous.","It's covered in a very thick layer of mucous.","It's covered lightly in mucous."]
  return alien
}
