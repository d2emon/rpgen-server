var getAlien = require('./alien-type')

module.exports = function () {
  var alien = getAlien()
  alien.title = 'рыбы'
  alien.arms = null
  alien.legs = null
  alien.tails = require('../../../../data/alien/fish-tails.json')

  alien.names2a = require('../../../../data/alien-fish-parts-1.json')
  alien.names2b = require('../../../../data/alien-fish-parts-2.json')
  alien.names2c = require('../../../../data/alien-fish-parts-3.json')
  alien.names7b = require('../../../../data/alien-fish-noses.json')
  alien.names8 = require('../../../../data/alien-fish-ears.json'),
  alien.names11 = ["It's covered in thin, coarse scales.","It's covered in large, coarse scales.","It's covered in large, smooth scales.","It's covered in large, strong scales.","It's covered in small, coarse scales.","It's covered in small, smooth scales.","It's covered in small, strong scales.","It's covered in strong, hard scales.","It's covered in thick, coarse scales.","It's covered in thick, strong scales."];
  alien.names11a = "Их чешуя "
  return alien
}
