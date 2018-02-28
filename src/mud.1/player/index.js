function getuid() { return 'UID' }
function getpwuid(user) { return { name: user + '->PWUID->NAME' } }

var globme = ''
var iamon = false
var maxu = 1
function loseme() { console.log('\tLOSEME()') }
function putmeon() { console.log('\tPUTMEON()') }
function rte() { console.log('\tRTE()') }
function special(cmd) { console.log('\tSPECIAL(' + cmd + ')') }
function sendmsg() { console.log('\tSENDMSG()') }
function fpbn(name) { console.log('\tFPBN(' + name + ')') }

function loadPlayer(id) {
  console.log('\tLOAD PLAYER[' + id + ']')
  return null
  /*
  return {
    num: 0,
    name: 'g',
    loc: 0,
    pos: -1,
    lev: 1,
    vis: 0,
    str: -1,
    wpn: -1,
    sex: 0
  }
  */
}

function savePlayer(player) {
  console.log('\tSAVE PLAYER[' + player.num + ']')
  console.log(player)
}

var world = require('../world')

function cuserid() {
  /*
  	extern char *strchr();
  	getpw(getuid(),ary);
  	*strchr(ary,':')=0;
  */
  return getpwuid(getuid()).name
}

module.exports = {
  num: 0,
  name: globme,
  loc: 0,
  pos: -1,
  lev: 1,
  vis: 0,
  str: -1,
  wpn: -1,
  sex: 0,

  loseme: loseme,
  puton: function () {
    iamon = false
    var unit = world.load()
    if (fpbn(this.name)) {
      throw Error('You are already on the system - you may only be on once at a time')
    }

    this.num = 0
    while (this.num < maxu) {
      if (!loadPlayer(this.num))
        break
      this.num++
    }

    if (this.num >= maxu)
      throw Error('Sorry AberMUD is full at the moment')

    this.loc = this.loc
    this.pos = -1
    this.lev = 1
    this.vis = 0
    this.str = -1
    this.wpn = -1
    this.sex = 0
    savePlayer(this)

    iamon = true
  },
  rte: rte,
  special: special,
  sendmsg: sendmsg,
  load: function (username) {
    if (username == 'Phantom')
      this.name = 'The ' + username
    else
      this.name = username
    console.log('Hello ' + this.name + '\n')
    console.info('GAME ENTRY: ' + this.name + '[' + cuserid() + ']')
  }
}
