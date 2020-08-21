var getAlien = require('./alien-type')

module.exports = function () {
  var alien = getAlien()
  alien.title = 'млекопитающие'
  return alien
}
