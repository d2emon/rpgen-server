/*
 *
 *		AberMUD II   C
 *
 *
 *	This game systems, its code scenario and design
 *	are (C) 1987/88  Alan Cox,Jim Finnis,Richard Acott
 *
 *
 *	This file holds the basic communications routines
 *
 */

var i_setup = 0
var oddcat = 0
var talkfl = 0

var cms = -1
var curch = 0

var globme = ''
var curmode = 0
var meall = 0
 /*

 Data format for mud packets

 Sector 0
 [64 words]
 0   Current first message pointer
 1   Control Word
 Sectors 1-n  in pairs ie [128 words]

 [channel][controlword][text data]

 [controlword]
 0 = Text
 - 1 = general request

 */

function vcpy(dest, offd, source, offs, len) {
  for(let c = 0; c < len; c++) {
    dest[c + offd] = source[c + offs]
  }
}

function mstoout(block, name) {
  let x = block
  /* Print appropriate stuff from data block */
  luser = name.toLowerCase()
  if (debug_mode) bprintf('\n<' + block[1] + '>')
  if (block[1] < -3) sysctrl(block, luser)
  else bprintf(x + 2 * sizeof(long))
}

var gurum = 0
var convflg = 0

function sendmsg(name) {
  let prmpt = ''
  let a = 0
  let work = ''
  let w2 = ''
  // l:
  pbfr()
  if (tty==4) btmscr()
  prmpt = '\r'
  if (me.vis) prmpt += '('
  if (debug_mode) prmpt += '#'
  if (me.lev > 9) prmpt += '----'
  if (convflg == 0) {
    prmpt += '>'
  } else if (convflg == 1) {
    prmpt += '\"'
  } else if (convflg == 2) {
    prmpt += '*'
  } else {
    prmpt = '?'
  }
  if (me.vis) prmpt += ')'
  pbfr()
  if (me.vis > 9999) set_progname(0, '-csh')
  else work = '   --}----- ABERMUD -----{--     Playing as ' + name
  if (me.vis == 0) set_progname(0, work)
  sig_alon()
  key_input(prmpt, 80)
  sig_aloff()
  work = key_buff
  if (tty==4) topscr()
  sysbuf = '\001l'
  sysbuf += work
  sysbuf += '\n\001'
  openworld()
  rte(name)
  closeworld()
  if (convflg && (work == '**')) {
    convflg = 0
    // goto l
  }

  let nadj = false
  if (!work) nadj = true
  if ((work != '*') && (work[0] == '*')) {
    work[0] = ' '
    nadj = true
  }
  if (nadj && convflg) {
    w2 = work
    if (convflg == 1) work = 'say ' + w2
    else work = 'tss ' + w2
  }
  // nadj:
  if (curmode == 1) gamecom(work)
  else {
    if ((work != '.Q') && (work != '.q') && work) {
      a = special(work, name)
    }
  }
  if (fighting>-1) {
    if (fighting.name = '') {
      in_fight = 0
      fighting = -1
    }
    if (fighting.loc != curch) {
      in_fight = 0
      fighting = -1
    }
  }
  if (in_fight) in_fight -= 1
  return ((work == '.Q') || (work == '.q'))
}

function send2(block) {
  let number = 0
  let inpbk = []
  let unit = openworld()
  if (unit<0) {
    loseme()
    crapup('\nAberMUD: FILE_ACCESS : Access failed\n')
  }
  sec_read(unit, inpbk, 0, 64)
  number = 2 * inpbk[1] - inpbk[0]
  inpbk[1]++
  sec_write(unit, block, number, 128)
  sec_write(unit, inpbk, 0, 64)
  if (number >= 199) cleanup(inpbk)
  if (number>=199) longwthr()
}

function readmsg(channel, block, num) {
  let buff = ''
  let actnum = 0
  sec_read(channel, buff, 0, 64)
  actnum = num * 2 - buff[0]
  sec_read(channel, block, actnum, 128)
}

var fl_com = 0

function rte(name) {
  let too
  let ct
  let block = []
  let unit = openworld()
  fl_com = unit
  if (!unit) crapup('AberMUD: FILE_ACCESS : Access failed\n')
  if (cms == -1) cms = findend(unit)
  let too = findend(unit)
  for (let ct = cms; ct < too; ct++) {
    readmsg(unit, block, ct)
    mstoout(block, name)
  }
  cms = ct
  update(name)
  eorte()
  rdes=0
  tdes=0
  vdes=0
}

function openlock(file, perm) {
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
}

function findstart(unit) {
  sec_read(unit, bk, 0, 1)
  return bk[0]
}

function findend(unit) {
  sec_read(unit, bk, 0, 2)
  return(bk[1])
}

function talker(name) {
  makebfr()
  cms = -1
  putmeon(name)
  if (!openworld()) crapup("Sorry AberMUD is currently unavailable")
  if (mynum >= maxu) {
    printf("\nSorry AberMUD is full at the moment\n")
    return 0
  }
  globme = name
  rte(name)
  closeworld()
  cms = -1
  special('.g', name)
  i_setup = 1
  while (1) {
    pbfr()
    sendmsg(name)
    if (rd_qd) rte(name)
    rd_qd = 0
    closeworld()
    pbfr()
  }
}

var rd_qd = 0

function cleanup (inpbk) {
  let unit = openworld()
  bk = malloc(1280 * sizeof(long))

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

  free(bk)
  inpbk[0] = inpbk[0] + 100
  sec_write(unit, inpbk, 0, 64)
  revise(inpbk[0])
}

function special(string, name) {
  bk = string.toLowerCase()
  ch = bk[0]
  if (ch != '.') return 0
  ch = bk[1]
  if (ch == 'g') {
    curmode = 1
    curch = -5
    initme()
    ufl = openworld()
    // me.str
    // me.lev
    if (me.lev<10000) me.vis = 0
    else me.vis = 10000
    me.wpn = -1
    // me.sexall
    me.helping = -1
    cuserid(us)
    xy = '\001s' + name + '\001' + name + '  has entered the game\n\001')
    xx = '\001s' + name + '\001[ ' + name + '  has entered the game ]\n\001')
    sendsys(name, name, -10113, curch, xx)
    rte(name)
    if (randperc() > 50) trapch(-5)
    else {
      curch = -183
      trapch(-183)
    }
    sendsys(name, name, -10000, curch, xy)
  } else {
    console.log("\nUnknown . option\n")
  }
  return 1
}

var dsdb = 0
var moni = 0

function broad(mesg) {
  rd_qd = 1
  block[1] = -1
  bk2 = mesg
  vcpy(block, 2, bk2, 0, 126)
  send2(block)
}

function tbroad(message){
  broad(message)
}

function sysctrl(block, luser) {
  gamrcv(block)
}

var bound = 0
var tmpimu = 0
var echoback = "*e"
var tmpwiz = "." /* Illegal name so natural immunes are ungettable! */

function split(block, nam1, nam2, work, luser) {
  vcpy(wkblock, 0, block, 2, 126)
  vcpy(work, 0, block, 64, 64)
  a = scan(nam1, wkblock, 0, "", ".")
  scan(nam2, wkblock, a + 1, "", ".")
  if (strncmp(nam1,"The ",4) || strncmp(nam1, "the ", 4)) {
    if (lowercase(nam1+4) == luser.toLowerCase()) return 1
  }
  return nam1.toLowerCase() == luser.toLowerCase()
}

function trapch(chan) {
  // if (me.lev > 9) goto ndie;
  // ndie:
  let unit = openworld()
  me.loc == chan
  lookin(chan)
}

var mynum = 0

function putmeon(name) {
  iamon = 0
  let unit = openworld()
  ct = 0
  f = 0
  if (fpbn(name) != -1) {
    crapup("You are already on the system - you may only be on once at a time")
  }
  while ((f == 0) && (ct < maxu)) {
    if (!p(ct).name.length) f = 1
    else ct++
  }
  if (ct == maxu) {
    mynum = maxu
    return
  }
  p(ct).name = name
  p(ct).loc = me.lock
  p(ct).pos = -1
  p(ct).lev = 1
  p(ct).vis = 0
  p(ct).str = -1
  p(ct).wpn = -1
  p(ct).sex = 0
  me.num = ct
  iamon = 1
}

function loseme(name) {
  sig_aloff()
  /* No interruptions while you are busy dying */
  /* ABOUT 2 MINUTES OR SO */
  i_setup = 0

  unit = openworld()
  dumpitems()
  if (me.vis < 10000) {
    bk = me.name + ' has departed from AberMUDII\n'
    sendsys(globme, globme, -10113, 0, bk)
  }
  me.name = ''
  closeworld()
  if (!zapped) saveme()
  chksnp()
}

var lasup = 0

function update(name) {
  xp = cms - lasup
  if (xp<0) xp = -xp
  if (xp<10) return
  let unit = openworld()
  me.pos = cms
  lasup = cms
}

function revise(cutoff) {
  let unit = openworld()
  for (let ct = 0; ct < 16; ct++) {
    if (p(ct).name && (p(ct).pos < cutoff / 2) && (p(ct).pos != -2)) {
      mess = p(ct).name + ' has been timed out\n'
      broad(mess)
      dumpstuff(ct, p(ct).loc)
      p(ct).name = ''
    }
  }
}

function lookin(room) {
  /* Lords ???? */
  closeworld();
  if (ail_blind) {
    bprintf("You are blind... you can't see a thing!\n")
  }
  if (me.lev > 9) showname(room)
  let un1 = openroom(room, "r")
  if (un1) {
    // xx1:
    xxx = 0
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
          loseme(globme)
          crapup("bye bye.....\n")
        }
      } else {
        if (str == "#NOBR") brmode = 0
        else
             if((!ail_blind)&&(!xxx))bprintf("%s\n",str);
          xxx=brmode;
}
          }
       }
    else
       bprintf("\nYou are on channel %d\n",room);
    fclose(un1);
    openworld();
    if(!ail_blind)
    {
	    lisobs();
	    if(curmode==1) lispeople();
    }
    bprintf("\n");
    onlook();
    }
 loodrv()
    {
    extern long curch;
    lookin(curch);
    }


long iamon=0;

userwrap()
{
extern char globme[];
extern long iamon;
if(fpbns(globme)!= -1) {loseme();syslog("System Wrapup exorcised %s",globme);}
}

fcloselock(file)
FILE *file;
{
	fflush(file);
	flock(fileno(file),LOCK_UN);
	fclose(file);
}
