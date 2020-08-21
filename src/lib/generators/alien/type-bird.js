var getAlien = require('./alien-type')

module.exports = function () {
  var alien = getAlien()
  alien.title = 'птицы'

  alien.names2a = require('../../../../data/alien-bird-parts-1.json')
  alien.names2b = require('../../../../data/alien-bird-parts-2.json')
  alien.names2c = require('../../../../data/alien-bird-parts-3.json')
  alien.names7a = require('../../../../data/alien-bird-mouths.json')
  alien.names7b = [""];
  alien.names8 = require('../../../../data/alien-bird-ears.json'),
  alien.names9 = [""];
  alien.names11 = ["It's covered in large feathers.","It's covered in large, thin feathers.","It's covered in large, wide feathers.","It's covered in long, thin feathers.","It's covered in long, wide feathers.","It's covered in short, thin feathers.","It's covered in short, wide feathers.","It's covered in small feathers.","It's covered in small, thin feathers.","It's covered in small, wide feathers."];
  alien.names11a = "Их перья "
  return alien
}
