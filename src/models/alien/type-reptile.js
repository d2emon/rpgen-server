var getAlien = require('./alien-type')

module.exports = function () {
  var alien = getAlien()
  alien.title = 'рептилии'
  alien.arms = require('../../../data/alien/reptile-arms.json')  
  alien.legs = null

  alien.names2a = require('../../../data/alien-reptile-parts-1.json')
  alien.names2b = [""]
  alien.names2c = require('../../../data/alien-reptile-parts-3.json')
  alien.names11 = ["It's covered in thin, coarse scales.","It's covered in large, coarse scales.","It's covered in large, smooth scales.","It's covered in large, strong scales.","It's covered in small, coarse scales.","It's covered in small, smooth scales.","It's covered in small, strong scales.","It's covered in strong, hard scales.","It's covered in thick, coarse scales.","It's covered in thick, strong scales."]
  alien.names11a = "Их чешуя "
  return alien
}
