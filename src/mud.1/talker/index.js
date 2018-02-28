var cms = 0
var mynum = 0
var maxu = 100
var i_setup = 0
var rd_qd = 0

var crapup = require('../gamego/crapup')
var cerror = require('../crapup')
var world = require('../world')
var buffer = require('../buffer')

function prepare(user) {
  buffer.makebfr()
  cms = -1
  user.puton()
  console.log(user)
  if (!world.load())
    throw Error('Sorry AberMUD is currently unavailable')
  user.rte()
  world.save()
  cms = -1
  user.special('.g')
  i_setup = 1
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
