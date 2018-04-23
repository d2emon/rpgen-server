var getAlien = require('./alien-type')

module.exports = function () {
  var alien = getAlien()
  alien.title = 'беспозвоночные'
  alien.arms = require('../../../data/alien/invertebrate-arms.json')
  alien.legs = require('../../../data/alien/invertebrate-legs.json')
  alien.tails = require('../../../data/alien/invertebrate-tails.json')
  return alien
}
