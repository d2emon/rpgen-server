/**
 *		AberMUD II   C
 *
 *	This game systems, its code scenario and design
 *	are (C) 1987/88  Alan Cox,Jim Finnis,Richard Acott
 *
 *	This file holds the basic communications routines
 */

// Parser
var cmdMode = 0 // convflg

// User
var player = {
  id: 0, // mynum
  active: false,
  name: '', // globme
  loc: 0 // curch
  pos: null, // cms
  lev: 1, // ???
  vis: 0, // ???
  str: -1, // ???
  wpn: -1, // ???
  sex: 0, // ???

  updated: 0 // lasup
  iamon: 0 // UNKNOWN

  // Process message
  function sysctrl(block) {
    gamrcv(block)
  },
  // Apply message from 'block' to user
  function mstoout(block) {
    // name => this.name

    // debug_mode

    /* Print appropriate stuff from data block */
    if (debug_mode) bprintf('\n&lt;' + block[1] + '&gt;')
    if (block[1] < -3) this.sysctrl(block)
    else bprintf(block[2])
  },
  // Read all new messages
  function rte() {
    // name => this.name

    // rdes
    // tdes
    // vdes

    let unit = openworld()
    if (!unit) crapup('AberMUD: FILE_ACCESS : Access failed\n')

    if (!this.pos) this.pos = world.findend(unit)
    let too = world.findend(unit)
    for (let ct = cms; ct < too; ct++) {
      let block = world.readmsg(unit, ct)
      this.mstoout(block)
    }
    player.pos = ct

    player.update()
    eorte()
    rdes=0
    tdes=0
    vdes=0
  },
  // Do special cmd
  function special(string) {
    // name => this.name

    let bk = string.toLowerCase()
    if (bk.length < 2) return 0
    if (bk[0] != '.') return 0
    if (bk[1] == 'g') {
      curmode = 1
      this.loc = -5
      initme()
      let ufl = openworld()
      // this.str
      // this.lev
      if (this.lev<10000) this.vis = 0
      else this.vis = 10000
      this.wpn = -1
      // this.sexall
      this.helping = -1
      let us = cuserid()
      xy = '\001s' + this.name + '\001' + this.name + '  has entered the game\n\001')
      xx = '\001s' + this.name + '\001[ ' + this.name + '  has entered the game ]\n\001')
      sendsys(this.name, this.name, -10113, this.loc, xx)
      this.rte()
      if (randperc() > 50) trapch(-5)
      else {
        this.loc = -183
        trapch(-183)
      }
      sendsys(this.name, this.name, -10000, this.loc, xy)
    } else {
      console.log("\nUnknown . option\n")
    }
    return 1
  },
  // Add player to system
  function putmeon() {
    // name => this.name

    //maxu

    this.iamon = 0
    let unit = openworld()
    if (fpbn(name)) {
      crapup("You are already on the system - you may only be on once at a time")
    }
    let ct = 0
    while (ct < maxu) {
      if (!world.players[ct].active) break
      ct++
    }
    if (ct == maxu) {
      this.id = maxu
      return
    }
    this.id = ct
    this.active = true
    // this.name = this.name
    // player.loc = player.loc
    this.pos = null
    this.lev = 1
    this.vis = 0
    this.str = -1
    this.wpn = -1
    this.sex = 0
    world.players[ct] = this
    this.iamon = 1
  },
  // Leave game
  function loseme(name) {
    // name => this.name

    // zapped

    sig_aloff()
    /* No interruptions while you are busy dying */
    /* ABOUT 2 MINUTES OR SO */
    i_setup = 0

    let unit = openworld()
    dumpitems()
    if (this.vis < 10000) {
      bk = this.name + ' has departed from AberMUDII\n'
      sendsys(this.name, this.name, -10113, 0, bk)
    }
    this.active = false
    closeworld()
    if (!zapped) saveme()
    chksnp()
  }
  // Update player position
  function update(name) {
    // name => this.name

    let xp = this.pos - this.updated
    if (xp < 0) xp = -xp
    if (xp < 10) return
    let unit = openworld()
    // this.pos = this.pos
    this.updated = this.pos
  }
}

function rte(name) { player.rte() }
function special(string, name) { player.special(string) }
function loseme(name) { player.loseme() }
function update(name) { player.update() }

var filelock = {
  // Open file with lock
  function open (file, perm) {
    let ct = 0
    let unit = fopen(file, perm)
    if (!unit) return unit
    /* NOTE: Always open with R or r+ or w */
    let intr = true
    while (intr) {
      intr = false
      if (flock(fileno(unit), LOCK_EX) == -1) {
        if(errno == EINTR) intr = true
        /* INTERRUPTED SYSTEM CALL CATCH */
      }
    }
    if (errno == ENOSPC) crapup('PANIC exit device full\n')
    /* case ESTALE:;*/
    if (errno == EHOSTUNREACH) crapup('PANIC exit access failure, NFS gone for a snooze')
    return unit
  },
  // Close file and unlock
  function close (file) {
    fflush(file)
    flock(fileno(file), LOCK_UN)
    fclose(file)
  }
}

function openlock(file, perm) { return filelock.open(file, perm) }
function fcloselock(file) { filelock.close() }

var world = {
  players: [],
  // Read message #'num' from 'channel'
  function readmsg(channel, num) {
    let buff = ''
    sec_read(channel, buff, 0, 64)
    let actnum = num * 2 - buff[0]
    sec_read(channel, block, actnum, 128)
    return block
  },
  // Write 'block' to world file and longtimed events
  function send2(block) {
    let inpbk = []
    let unit = openworld()
    if (unit<0) {
      player.loseme()
      crapup('\nAberMUD: FILE_ACCESS : Access failed\n')
    }
    sec_read(unit, inpbk, 0, 64)
    let number = 2 * inpbk[1] - inpbk[0]
    inpbk[1]++
    sec_write(unit, block, number, 128)
    sec_write(unit, inpbk, 0, 64)
    if (number >= 199) this.cleanup(inpbk)
    if (number >= 199) longwthr()
  },
  // Clean old messages
  function cleanup (inpbk) {
    let unit = openworld()
    let bk = []

    sec_read(unit, bk, 101, 1280)
    sec_write(unit, bk, 1, 1280)

    sec_read(unit, bk, 121, 1280)
    sec_write(unit, bk, 21, 1280)

    sec_read(unit, bk, 141, 1280)
    sec_write(unit, bk, 41, 1280)

    sec_read(unit, bk, 161, 1280)
    sec_write(unit, bk, 61, 1280)

    sec_read(unit, bk, 181, 1280)
    sec_write(unit, bk, 81, 1280)

    bk = []
    inpbk[0] += 100
    sec_write(unit, inpbk, 0, 64)
    this.revise(inpbk[0])
  },
  // Remove inactive players
  function revise(cutoff) {
    let unit = openworld()
    for (let ct = 0; ct < 16; ct++) {
      if (this.players[ct].active && (this.players[ct].pos < cutoff / 2) && (this.players[ct].pos != -2)) {
        let mess = this.players[ct].name + ' has been timed out\n'
        broad(mess)
        dumpstuff(ct, this.players[ct].loc)
        this.players[ct].active = false
      }
    }
  },
  // Find last message
  function findend(unit) {
    sec_read(unit, bk, 0, 2)
    return bk[1]
  }
}

function send2(block) { world.send2(block) }

// Unused
// var oddcat = 0
// var talkfl = 0
// var meall = 0
// var gurum = 0
// var dsdb = 0
// var moni = 0
// var bound = 0
// var tmpimu = 0
// var echoback = "*e"
// var tmpwiz = "." /* Illegal name so natural immunes are ungettable! */
// var fl_com = 0

var i_setup = 0
// mobile, parse, tk
var curmode = 0
// parse, tk
var rd_qd = 0
// magic, tk

/**
 * Data format for mud packets
 *
 * Sector 0
 * [64 words]
 * 0   Current first message pointer
 * 1   Control Word
 * Sectors 1-n  in pairs ie [128 words]
 *
 * [channel][controlword][text data]
 *
 * [controlword]
 * 0 = Text
 * -1 = general request
 */

// Unused
// function vcpy(dest, offd, source, offs, len)
// copy from source to dest with offsets
// function tbroad(message)
// Same as broad(message)
// function loodrv()
// Same as lookin(curch)
// function userwrap()
// loose if fpbns(player.name) with "System Wrapup exorcised {{player.name}}"
// function findstart(unit)
// Find first message

// Broadcast message
function broad(mesg) {
  rd_qd = 1
  // VCPY
  let block = [0, -1]
  block.push(mesg.slice(0, 126))
  world.send2(block)
}

// Parse string. Find 'nam1' & 'nam2' in 'block' divided by ".". Compare 'nam1' with 'luser'
function split(block, nam1, nam2, work, luser) {
  // VCPY
  let wkblock = block.slice(2, 128)
  let work = block.slice(64, 128)
  let a = scan(nam1, wkblock, 0, "", ".")
  scan(nam2, wkblock, a + 1, "", ".")
  if ((nam1.slice(0, 4) == 'The ') || (nam1.slice(0, 4) == 'the ')) {
    if (nam1.slice(4).toLowerCase() === luser.toLowerCase()) return true
  }
  return nam1.toLowerCase() == luser.toLowerCase()
}

// Go to 'chan'
function trapch(chan) {
  // if (me.lev > 9) goto ndie;
  // ndie:
  let unit = openworld()
  player.loc == chan
  lookin(chan)
}

// Look into room
function lookin(room) {
  // ail_blind
  // brmode
  /* Lords ???? */
  closeworld()
  if (ail_blind) {
    bprintf("You are blind... you can't see a thing!\n")
  }
  if (me.lev > 9) showname(room)
  let un1 = openroom(room, "r")
  if (un1) {
    // xx1:
    let xxx = 0
    lodex(un1)
    if (isdark()) {
      fclose(un1)
      bprintf("It is dark\n")
      openworld()
      onlook()
      return
    }
    while (getstr(un1, str)) {
      if (str == "#DIE") {
        if (ail_blind) {
          rewind(un1)
          ail_blind = 0
          // goto xx1
        }
        if (me.lev > 9) bprintf("<DEATH ROOM>\n")
        else {
          player.loseme(player)
          crapup("bye bye.....\n")
        }
      } else {
        if (str == "#NOBR") brmode = 0
        else {
          if ((!ail_blind) && (!xxx)) bprintf("%s\n", str)
        }
        xxx = brmode
      }
    }
  } else
    bprintf("\nYou are on channel %d\n", room)
  fclose(un1)
  openworld()
  if (!ail_blind) {
    lisobs()
    if (curmode == 1) lispeople()
  }
  bprintf("\n")
  onlook()
}

// Prompt player answer
// Once
function sendmsg(name) {
  function promptSign(data) {
    let prmpt = '\r'
    if (data.debug_mode) prmpt += '#'
    if (data.me.lev > 9) prmpt += '----'
    if (data.cmdMode == 0) {
      prmpt += '>'
    } else if (data.cmdMode == 1) {
      prmpt += '\"'
    } else if (data.cmdMode == 2) {
      prmpt += '*'
    } else {
      prmpt = '?'
    }
    if (data.me.vis) prmpt = '(' + prmpt + ')'
    return prmpt
  }
  function stopFight() {
    fighting = null
    in_fight = 0
  }
  // debug_mode
  // me.lev
  // me.vis
  // key_buff
  // tty
  // fighting
  // in_fight

  let a = 0
  let w2 = ''
  // l:
  pbfr()

  if (tty==4) btmscr()

  let prmpt = promptSign({
    debug_mode: debug_mode,
    me: me,
    cmdMode: cmdMode
  })

  pbfr()

  let work = ''
  if (me.vis > 9999) set_progname(0, '-csh')
  else work = '   --}----- ABERMUD -----{--     Playing as ' + name
  if (me.vis == 0) set_progname(0, work)

  sig_alon()
  key_input(prmpt, 80)
  sig_aloff()
  work = key_buff

  if (tty==4) topscr()

  sysbuf = '<span class="l">' + work + '\n</span>'

  openworld()
  player.rte()
  closeworld()

  if (cmdMode && (work == '**')) {
    cmdMode = 0
    // goto l
  }

  let nadj = false
  if (!work) nadj = true
  if ((work != '*') && (work[0] == '*')) {
    work[0] = ' '
    nadj = true
  }
  if (nadj && cmdMode) {
    w2 = work
    if (cmdMode == 1) work = 'say ' + w2
    else work = 'tss ' + w2
  }
  // nadj:

  if (curmode == 1) gamecom(work)
  else {
    if ((work != '.Q') && (work != '.q') && work) {
      a = player.special(work)
    }
  }

  if (fighting>-1) {
    if (fighting.active = '') {
      stopFight()
    }
    if (fighting.loc != curch) {
      stopFight()
    }
  }
  if (in_fight) in_fight--

  return ((work == '.Q') || (work == '.q'))
}

// Main game loop
// Once
function talker(name) {
  // maxu

  makebfr()
  player.pos = null
  player.putmeon()
  if (!openworld()) crapup("Sorry AberMUD is currently unavailable")
  if (player.id >= maxu) {
    printf("\nSorry AberMUD is full at the moment\n")
    return 0
  }
  player.name = name
  player.active = true
  player.rte()
  closeworld()
  player.pos = null
  player.special('.g')
  i_setup = 1
  while (true) {
    pbfr()
    sendmsg(name)
    if (rd_qd) player.rte()
    rd_qd = 0
    closeworld()
    pbfr()
  }
}
