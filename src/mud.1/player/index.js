function getuid() { return 'UID' }
function getpwuid(user) { return { name: user + '->PWUID->NAME' } }

var globme = ''
var iamon = false
var maxu = 100
var lasup = -1
var last_io_interrupt = 0
var rdes = 0
var tdes = 0
var vdes = 0
function loseme() { console.log('\tLOSEME()') }
function special(cmd) { console.log('\tSPECIAL(' + cmd + ')') }
function sendmsg() { console.log('\tSENDMSG()') }
function fpbn(name) { console.log('\tFPBN(' + name + ')') }
function forchk() { console.log('\tFORCHK()') }
function iswornby(item, player) {
  console.log('\tISWORNBY(' + item + ', ' + player + ')')
  return true
}
function randperc() {
  console.log('\tRANDPERC()')
  return 50
}

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

  ivct: 0,
  cal: false,
  in_fight: 0,
  fighting: null,
  drunk: 0,
  dumb: false,
  i_setup: false,

  prepare: function () {
    this.pos = -1
    this.puton()
    console.log(this)
    if (!world.load())
      throw Error('Sorry AberMUD is currently unavailable')
    this.rte()
    world.save()
    this.pos = -1
    this.special('.g')
    this.i_setup = true

  },

  loseme: loseme,
  update: function () {
    var xp = this.pos - lasup
    if (xp < 0) xp = -xp
    if (xp < 10) return
    var unit = world.load()
    lasup = this.pos
  },
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
  rte: function () {
    if (!world.load())
      throw Error("AberMUD: FILE_ACCESS : Access failed")
    if (this.pos == -1)
      this.pos = world.findend()
    too = world.findend()
    for(ct = this.pos; ct < too; ct++) {
      block = world.readmsg(ct)
      this.mstoout(block)
    }
    this.pos = ct
    this.update()
    this.eorte()
    rdes = 0
    tdes = 0
    vdes = 0
  },
  special: function () {
    bk = this.name.toLowerCase()
    ch = bk[0]
    if (ch != '.') return 0
    ch = bk[1]
    if (ch == 'g') {
      curmode = 1
      this.loc = -5
      initme()
      ufl = openworld()
      if (this.lev < 10000)
        this.vis = 0
      else
        this.vis = 10000
      this.wpn = -1
      this.helping = -1
      us = cuserid()
      xy = '\001s' + this.name + '\001' + this.name + '  has entered the game\n\001'
      xx = '\001s' + this.name + '\001[ ' + this.name + '  has entered the game ]\n\001'
      sendsys(this, this, -10113, this.loc, xx)
      this.rte()
      if (randperc() > 50) trapch(-5)
      else {
        this.loc = -183
        trapch(-183)
      }
      sendsys(this, this, -10000, this.loc, xy)
      return true
    } else {
      console.log('\nUnknown . option\n')
      return true
    }
  },
  sendmsg: sendmsg,

  eorte: function () {
    var ctm = new Date().getTime()
    if (ctm - last_io_interrupt > 2) interrupt = 1
    if (interrupt) last_io_interrupt = ctm

    if (this.ivct) me_ivct--
    if (this.ivct == 1) this.vis = 0

    if (this.cal) {
      this.cal = false
      calibme()
    }

    if (tdes) dosumm(ades)

    if (this.in_fight) {
      if(this.fighting.loc != this.loc) {
        this.fighting = null
        this.in_fight = 0
      }
      if (!this.fighting.name.length) {
        this.fighting = null
        this.in_fight = 0
      }
      if (this.in_fight) {
        if (interrupt) {
          this.in_fight = 0
          hitplayer(this.fighting, this.wpn)
        }
      }
    }

    if (iswornby(18, this) || (randperc() < 10)) {
      this.str++
      if (this.i_setup) calibme()
    }
    forchk()
    if (this.drunk > 0) {
      this.drunk--
      if (!this.dumb) gamecom('hiccup')
    }
    interrupt = 0
  },

  load: function (username) {
    if (username == 'Phantom')
      this.name = 'The ' + username
    else
      this.name = username
    console.log('Hello ' + this.name + '\n')
    console.info('GAME ENTRY: ' + this.name + '[' + cuserid() + ']')
  }
}
