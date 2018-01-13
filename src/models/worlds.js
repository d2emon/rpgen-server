var worlds = [
  'World01',
  'World02',
  'World03',
  'World04',
  'World05'
]

function generate () {
  return worlds[Math.floor(Math.random() * worlds.length)]
}

module.exports = {
  'worlds': worlds,
  generate
}
