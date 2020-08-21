var getAlien = require('./alien-type')

module.exports = function () {
  var alien = getAlien()
  alien.title = 'водные млекопитающие'

  alien.names2a = require('../../../../data/alien-aquatic-parts-1.json'),
  alien.names2b = require('../../../../data/alien-aquatic-parts-2.json'),
  alien.names2c = require('../../../../data/alien-aquatic-parts-3.json'),
  alien.names9 = require('../../../../data/alien-aquatic-horns.json'),
  alien.names11 = [""]
  return alien
}
