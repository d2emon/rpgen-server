var rd_qd = 0

var player = require('../player')
var world = require('../world')
var buffer = require('../buffer')

function prepare(user) {
  buffer.makebfr()
  user.prepare()
}

function mainLoop(user) {
  buffer.pbfr()
  user.sendmsg()
  if(rd_qd) user.rte()
  rd_qd = 0
  world.save()
  buffer.pbfr()
}

function talker(user) {
  prepare(user)
  // while(1) {
  for (var i = 0; i < 10; i++) {
    mainLoop(user)
  }
}

module.exports = talker
