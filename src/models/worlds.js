var models = require('./index')
var worlds = require('../../data/worlds.json')

var images = [
  'house.jpg',
  'road.jpg',
  'plane.jpg',
  'sunshine.jpg'
]

function generate () {
  let world = models.generate(worlds)
  console.log(world)
  console.log({
    id: 0,
    title: world,
    subtitle: '1,000 miles of wonder',
    src: '/static/images/' + models.generate(images)
  })

  return {
    id: 0,
    title: world,
    subtitle: '1,000 miles of wonder',
    src: '/static/images/' + models.generate(images)
  }
}

function listWorlds () {
  var res = []
  for (var i = 0; i < worlds.length; i++) {
    res.push({
      id: i,
      title: worlds[i],
      subtitle: '1,000 miles of wonder',
      src: '/static/images/' + models.generate(images)
    })
  }
  return res
}

module.exports = {
  'worlds': listWorlds,
  generate
}
