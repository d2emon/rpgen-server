/**
 * globme holds global me data
 */

// #define  OBMUL 8

 /**
  * Objects held in format
  *
  * [Short Text]
  * [4 Long texts]
  * [Max State]
  */

 /**
  * Objects in text file in form
  *
  * Stam:state:loc:flag
  */

var debug_mode = 0

function sendsys(to, from, codeword, chan, text) {
  let block = []
  let i = text
  block[1] = codeword
  block[0] = chan
  block[2] = to + '.' + from + '.'
  if ((codeword != -9900) && (codeword != -10021)) block[64] = text
  else {
    block[64] = i[0]
    block[65] = i[1]
    block[66] = i[2]
  }
  send2(block)
}

var strbuf = ''
var wordbuf = ''
var wd_it = ''
var wd_him = ''
var wd_her = ''
var wd_them = ''
var wd_there = ''
var stp = 0

function pncom() {
  bprintf("Current pronouns are:\n")
	bprintf("Me              : %s\n", globme)
	bprintf("Myself          : %s\n", globme)
	bprintf("It              : %s\n", wd_it)
	bprintf("Him             : %s\n", wd_him)
	bprintf("Her             : %s\n", wd_her)
	bprintf("Them            : %s\n", wd_them)
	if (me.lev>9) {
		bprintf("There           : %s\n", wd_there)
	}
}

function gamecom(str) {
  if (str != '!') strbuf == str
  if (str == '.q') str = ''  /* Otherwise drops out after command */
  stp = 0
  if (!str) return 0
  if (str == '!') str == strbuf
  if (!brkword()) {
    bprintf("Pardon ?\n")
    return -1
  }
  let a = chkverb()
  if (!a) {
    bprintf("I don't know that verb\n")
    return -1
  }
  doaction(a)
  return 0
}

function brkword() {
  // x1
  let worp = 0
  while (strbuf[stp] == ' ') stp++
  while (strbuf[stp] && (strbuf[stp]!=' ')) {
    wordbuf[worp++] = strbuf[stp++]
  }
  wordbuf[worp] = 0
  wordbuf = wordbuf.toLowerCase()
  if (wordbuf == 'it') wordbuf = wd_it
  if (wordbuf == 'them') wordbuf = wd_them
  if (wordbuf == 'him') wordbuf = wd_him
  if (wordbuf == 'her') wordbuf = wd_her
  if (wordbuf == 'me')  wordbuf = this.name
  if (wordbuf == 'myself') wordbuf = this.name
  if (wordbuf == 'there') wordbuf = wd_there
  if (worp) return true
  else return false
}

function chklist(word, lista, listb) {
  let a = 0
  let b = 0
  let c = 0
  let d = -1
  word = word.toLowerCase()
  while (lista[a]) {
    b = Match(word, lista[a])
    if (b > c) {
      c = b
      d = listb[a]
    }
    a++
  }
  if (c < 5) return null /* No good matches */
  return d
}

function Match(x, y) {
  let c = 0
  let n = 0
  if (x == y) return 10000
  if (y == 'reset') return -1
  if (!x) return 0
  while (x[n] && y[n]) {
    if (x[n] == y[n]) {
      if (n == 0) c += 2
      if (n == 1) c++
      c++
    }
    n++
  }
  return c
}

function chkverb() {
  return chklist(wordbuf, verbtxt, verbnum)
}

var verbtxt = ["go","climb","n","e","s","w","u","d",
    "north","east","south","west","up","down",
    "quit",
    "get","take","drop","look","i","inv","inventory","who",
    "reset","zap","eat","drink","play",
    "shout","say","tell","save","score"
    ,"exorcise","give","steal","pinch","levels","help","value"
    ,"stats","examine","read","delete","pass","password",
    "summon","weapon","shoot","kill","hit","fire","launch","smash","break",
    "laugh","cry","burp","fart","hiccup","grin","smile","wink","snigger"
    ,"pose","set","pray","storm","rain","sun","snow","goto",
    "wear","remove","put","wave","blizzard","open","close",
    "shut","lock","unlock","force","light","extinguish","where","turn",
    "invisible","visible","pull","press","push","cripple","cure","dumb",
    "change","missile","shock","fireball","translocate","blow",
    "sigh","kiss","hug","slap","tickle","scream","bounce","wiz"
    ,"stare","exits","crash","sing","grope","spray"
    ,"groan","moan","directory","yawn","wizlist","in","smoke"
    ,"deafen","resurrect","log","tss","rmedit","loc","squeeze","users"
    ,"honeyboard","inumber","update","become","systat","converse"
    ,"snoop","shell","raw","purr","cuddle","sulk","roll","credits"
    ,"brief","debug","jump","wield","map","flee","bug","typo","pn"
    ,"blind","patch","debugmode","pflags","frobnicate","strike"
    ,"setin","setout","setmin","setmout","emote","dig","empty"
    ,0]
var verbnum = [1,1,2,3,4,5,6,7,2,3,4,5,6,7,8,9,9,10,11,12,12,12,13,14
    ,15,16,16,17,18,19,20,21,22,23,24,25,25,26,27,28,29,30,30,31,32,32,33,34,35,35,35,35,35
    ,35,35,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66
    ,100,101,102,103,104,105,106,106,107,108,109,110,111,112,117,114,115,117,117,117
    ,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133
    ,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149
    ,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170
    ,171,172,34,173,174,175,176,177,178,179,180,181,182,35,183,184,185,186,187,188,189]

var exittxt = ["north","east","south","west","up","down","n","e","s","w","u","d",0]
var exitnum = [1,2,3,4,5,6,1,2,3,4,5,6]

function doaction(n) {
    char xx[128];
    extern long my_sco;
    extern long curmode;
    extern long curch;
    extern long debug_mode;
    extern char globme[];
    extern long isforce;
    extern long in_fight;
    extern long brmode;
    long  brhold;
    extern long mynum;
    extern long my_lev;
    openworld();
    if((n>1)&&(n<8)){dodirn(n);return;}
    switch(n)
       {
       case 1:
          dogocom();
          break;
       case 139:
          if(in_fight)
             {
             bprintf("Not in a fight!\n");break;
             }
          gropecom();
          break;
       case 8:
          if(isforce)
             {
             bprintf("You can't be forced to do that\n");
             break;
             }
          rte(globme);
          openworld();
          if(in_fight)
             {
             bprintf("Not in the middle of a fight!\n");
             break;
             }
          sprintf(xx,"%s has left the game\n",globme);
          bprintf("Ok");
          sendsys(globme,globme,-10000,curch,xx);
          sprintf(xx,"[ Quitting Game : %s ]\n",globme);
          sendsys(globme,globme,-10113,0,xx);
          dumpitems();
          setpstr(mynum,-1);
          pname(mynum)[0]=0;
          closeworld();
          curmode=0;curch=0;
          saveme();
          crapup("Goodbye");
          break;
       case 9:
          getobj();
          break;
       case 137:
          crashcom();
          break;
       case 10:
          dropitem();
          break;
       case 11:
          look_cmd();
          break;
       case 12:
          inventory();
          break;
       case 13:
          whocom();
          break;
       case 14:
          rescom();
          break;
       case 15:
          lightning();
          break;
       case 16:
          eatcom();
          break;
       case 17:
          playcom();
          break;
       case 18:
          shoutcom();
          break;
       case 19:
          saycom();
          break;
       case 20:
          tellcom();
          break;
       case 21:
          saveme();
          break;
       case 22:
          scorecom();
          break;
       case 23:
          exorcom();
          break;
       case 24:
          givecom();
          break;
       case 25:
          stealcom();
          break;
       case 26:
          levcom();
          break;
       case 27:
          helpcom();
          break;
       case 28:
          valuecom();
          break;
       case 29:
          stacom();
          break;
       case 30:
          examcom();
          break;
       case 31:
          delcom();
          break;
       case 32:
          passcom();
          break;
       case 33:
          sumcom();
          break;
       case 34:
          weapcom();
          break;
       case 35:
          killcom();
          break;
       case 50:
          laughcom();
          break;
       case 51:
          crycom();
          break;
       case 52:
          burpcom();
          break;
       case 53:
          fartcom();
          break;
       case 54:
          hiccupcom();
          break;
       case 55:
          grincom();
          break;
       case 56:
          smilecom();
          break;
       case 57:
          winkcom();
          break;
       case 58:
          sniggercom();
          break;
       case 59:
          posecom();
          break;
       case 60:
          setcom();
          break;
       case 61:
          praycom();
          break;
       case 62:
          stormcom();
          break;
       case 63:
          raincom();
          break;
       case 64:
          suncom();
          break;
       case 65:
          snowcom();
          break;
       case 66:
          goloccom();
          break;
       case 100:
          wearcom();
          break;
       case 101:
          removecom();
          break;
       case 102:
          putcom();
          break;
       case 103:
          wavecom();
          break;
       case 104:
          blizzardcom();
          break;
       case 105:
          opencom();
          break;
       case 106:
          closecom();
          break;
       case 107:
          lockcom();
          break;
       case 108:
          unlockcom();
          break;
       case 109:
          forcecom();
          break;
       case 110:
          lightcom();
          break;
       case 111:
          extinguishcom();
          break;
       case 118:
          cripplecom();
          break;
       case 119:
          curecom();
          break;
       case 120:
          dumbcom();
          break;
       case 121:
          changecom();
          break;
       case 122:
          missilecom();
          break;
       case 123:
          shockcom();
          break;
       case 124:
          fireballcom();
          break;
       case 126:
          blowcom();
          break;
       case 127:
          sighcom();
          break;
       case 128:
          kisscom();
          break;
       case 129:
          hugcom();
          break;
       case 130:
          slapcom();
          break;
       case 131:
          ticklecom();
          break;
       case 132:
          screamcom();
          break;
       case 133:
          bouncecom();
          break;
       case 134:
          wizcom();
          break;
       case 135:
          starecom();
          break;
       case 136:
          exits();
          break;
       case 138:
          singcom();
          break;
       case 140:
          spraycom();
          break;
       case 141:
          groancom();
          break;
       case 142:
          moancom();
          break;
       case 143:
          dircom();
          break;
       case 144:
          yawncom();
          break;
       case 117:;
       case 113:
          pushcom();
          break;
       case 145:
          wizlist();
          break;
       case 146:
          incom();
          break;
       case 147:
          lightcom();
          break;
       case 114:
          inviscom();
          break;
       case 115:
          viscom();
          break;
       case 148:
          deafcom();
          break;
       case 149:
          ressurcom();
          break;
       case 150:
          logcom();
          break;
       case 151:
          tsscom();
          break;
       case 152:
          rmeditcom();
          break;
       case 154:
          squeezecom();
          break;
       case 153:
          loccom();
          break;
       case 155:
          usercom();
          break;
       case 156:
          u_system();
          break;
       case 157:
          inumcom();
          break;
       case 158:
          updcom();
          break;
       case 159:
          becom();
          break;
       case 160:
          systat();
          break;
       case 161:
          convcom();
          break;
       case 162:
          snoopcom();
          break;
       case 163:
          shellcom();
          break;
       case 164:
          rawcom();
          break;
       case 165:
          purrcom();
          break;
       case 166:
          cuddlecom();
          break;
       case 167:
          sulkcom();
          break;
       case 168:
          rollcom();
          break;
       case 169:
          bprintf("\001f%s\001",CREDITS);
          break;
       case 170:
          brmode=!brmode;
          break;
       case 171:
          debugcom();
          break;
       case 172:
          jumpcom();
          break;
       case 112:
          wherecom();
          break;
       case 173:
          bprintf("Your adventurers automatic monster detecting radar, and long range\n");
          bprintf("mapping kit, is, sadly, out of order.\n");break;
       case 174:
          if(!in_fight)
             {
             dogocom();
             break;
             }
          else
             {
             char ar[120];
             if(iscarrby(32,mynum))
                {
                bprintf("The sword won't let you!!!!\n");
                break;
                }
             sprintf(ar,"\001c%s\001 drops everything in a frantic attempt to escape\n",globme);
             sendsys(globme,globme,-10000,curch,ar);
             sendsys(globme,globme,-20000,curch,"");
             my_sco-=my_sco/33; /* loose 3% */
             calibme();
             in_fight=0;
             on_flee_event();
             dogocom();
             break;
             }
       case 175:
          bugcom();
          break;
       case 176:
          typocom();
          break;
       case 177:
          pncom();
          break;
       case 178:
          blindcom();
          break;
       case 179:
          edit_world();
          break;
       case 180:
          if(ptstflg(mynum,4)) debug_mode=1-debug_mode;
          break;
       case 181:
          setpflags();
          break;
       case 182:
          frobnicate();
          break;
       case 183:
          setincom();
          break;
       case 184:
          setoutcom();
          break;
       case 185:
          setmincom();
          break;
       case 186:
          setmoutcom();
          break;
       case 187:
          emotecom();
          break;
       case 188:
          digcom();
          break;
       case 189:
          emptycom();
          break;
       default:
          if(my_lev>9999)bprintf("Sorry not written yet[COMREF %d]\n",n);
          else bprintf("I don't know that verb.\n");
          break;
       }
    }

var in_ms = 'has arrived.'
var out_ms = ''
var mout_ms = 'vanishes in a puff of smoke.'
var min_ms = 'appears with an ear-splitting bang.'
var here_ms = 'is here'

function dogocom(n) {
  if (!brkword()) {
    bprintf("GO where ?\n")
    return null
  }
  if (wordbuf == 'rope') wordbuf = 'up'
  let a = chklist(wordbuf, exittxt, exitnum)
  if (!a) {
    bprintf("Thats not a valid direction\n")
    return null
  }
  return dodirn(a + 1)
}

function dodirn(n) {
  let block = ''
  let x = ''
  let newch = 0
  let fl = 0
  let i = 0
  if (in_fight > 0) {
    bprintf("You can't just stroll out of a fight!\n")
    bprintf("If you wish to leave a fight, you must FLEE in a direction\n")
    return
  }
  if (iscarrby(32, player.id) && (world.players[25].loc == player.loc) && world.players[25].active) {
    bprintf("\001cThe Golem\001 bars the doorway!\n")
    return
  }
  n -= 2
  if (chkcrip()) return
  newch = ex_dat[n]
  if((newch > 999) && (newch < 2000)) {
    let drnum = newch - 1000
    let droff = drnum ^ 1 /* other door side */
    if (state(drnum) != 0) {
      if ((o[drnum].name != 'door') || isdark() || (o[drnum].longt != state(drnum))) {
        bprintf("You can't go that way\n")
        /* Invis doors */
      } else
        bprintf("The door is not open\n")
      return
    }
    newch = o[droff].loc
  }
  if (newch == -139) {
    if ((!iswornby(113, player.id)) && (!(iswornby(114, player.id))) && (!iswornby(89, player.id))) {
      bprintf("The intense heat drives you back\n")
      return
    } else
      bprintf("The shield protects you from the worst of the lava stream's heat\n")
  }
  if (n == 2) {
    i = fpbns("figure")
    if ((i != player.loc) && i && (world.player[s[i].loc == player.loc) && !iswornby(101, player.id) && !iswornby(102, player.id) && !iswornby(103, player.id)) {
      bprintf("\001pThe Figure\001 holds you back\n")
      bprintf("\001pThe Figure\001 says 'Only true sorcerors may pass'\n")
      return
    }
  }
  if (newch>=0) bprintf("You can't go that way\n")
  else {
    block = '\001s' player.name + '\001' + player.name + ' has gone ' + exittxt[n] + ' ' + out_ms + '.\n\001'
    sendsys(player.name, player.name, -10000, player.loc, block)
    player.loc = newch
    block = '\001s' + player.name + '\001' + player.name + ' ' + in_ms + '\n\001'
    sendsys(player.name, player.name, -10000, newch, block)
    trapch(player.loc)
  }
}

var tdes = 0
var vdes = 0
var rdes = 0
var ades = 0
var zapped = 0

function gamrcv(blok) {
    extern long zapped;
    extern long vdes,tdes,rdes,ades;
    extern char globme[];
    auto long  zb[32];
    long *i;
    extern long curch;
    extern long my_lev;
    extern long my_sco;
    extern long my_str;
    extern long snoopd;
    extern long fl_com;
    char ms[128];
    char nam1[40],nam2[40],text[256],nameme[40];
    long isme;
    extern long fighting,in_fight;
    strcpy(nameme,globme);
    lowercase(nameme);
    isme=split(blok,nam1,nam2,text,nameme);
    i=(long *)text;
    if((blok[1]== -20000)&&(fpbns(nam1)==fighting))
       {
       in_fight=0;
       fighting= -1;
       }
    if(blok[1]<-10099)
       {
       new1rcv(isme,blok[0],nam1,nam2,blok[1],text);
       return;
       }
    switch(blok[1])
       {
       case -9900:
          setpvis(i[0],i[1]);break;
       case -666:
          bprintf("Something Very Evil Has Just Happened...\n");
          loseme();
          crapup("Bye Bye Cruel World....");
       case -599:
          if(isme)
             {
             sscanf(text,"%d.%d.%d.",&my_lev,&my_sco,&my_str);
             calibme();
             }
          break;
       case -750:
          if(isme)
             {
             if(fpbns(nam2)!= -1) loseme();
             closeworld();
             printf("***HALT\n");
             exit(0);
             }
       case -400:
          if(isme) snoopd= -1;
          break;
       case -401:
          if(isme)
             {
             snoopd=fpbns(nam2);
             }
          break;
       case -10000:
          if((isme!=1)&&(blok[0]==curch))
             {
             bprintf("%s",text);
             }
          break;
       case -10030:
          wthrrcv(blok[0]);break;
       case -10021:
          if(curch==blok[0])
             {
             if(isme==1)
                {
                rdes=1;
                vdes=i[0];
                bloodrcv((long *)text,isme);
                }
             }
          break;
       case -10020:
          if(isme==1)
             {
             ades=blok[0];
             if(my_lev<10)
                {
                bprintf("You drop everything you have as you are summoned by \001p%s\001\n",nam2);
                }
             else
                {
                bprintf("\001p%s\001 tried to summon you\n",nam2);
                return;
                }
             tdes=1;
             }
          break;
       case -10001:
          if(isme==1)
             {
             if (my_lev>10)
                bprintf("\001p%s\001 cast a lightning bolt at you\n", nam2);
             else
                /* You are in the .... */
                {
                bprintf("A massive lightning bolt arcs down out of the sky to strike");
                sprintf(zb,"[ \001p%s\001 has just been zapped by \001p%s\001 and terminated ]\n",
                    globme, nam2);
                sendsys(globme,globme,-10113,curch,zb);
                bprintf(" you between\nthe eyes\n");
                zapped=1;
                delpers(globme);
                sprintf(zb,"\001s%s\001%s has just died.\n\001",globme,globme);
                sendsys(globme,globme,-10000,curch,zb);
                loseme();
                bprintf("You have been utterly destroyed by %s\n",nam2);

                crapup("Bye Bye.... Slain By Lightning");
                }
             }
          else if (blok[0]==curch)
             bprintf("\001cA massive lightning bolt strikes \001\001D%s\001\001c\n\001", nam1);
          break;
       case -10002:
          if(isme!=1)
             {
             if (blok[0]==curch||my_lev>9)
                 bprintf("\001P%s\001\001d shouts '%s'\n\001", nam2, text);
             else
                bprintf("\001dA voice shouts '%s'\n\001",text);
             }
          break;
       case -10003:
          if(isme!=1)
             {
             if (blok[0]==curch)
                bprintf("\001P%s\001\001d says '%s'\n\001", nam2, text);
             }
          break;
       case -10004:
          if(isme)
             bprintf("\001P%s\001\001d tells you '%s'\n\001",nam2,text);
          break;
       case -10010:
          if(isme==1)
             {
             loseme();
             crapup("You have been kicked off");
             }
          else
             bprintf("%s has been kicked off\n",nam1);
          break;
       case -10011:
          if(isme==1)
             {
             bprintf("%s",text);
             }
          break;
          }
    }

var me_ivct = 0
var last_io_interrupt = 0

function eorte() {
  let ctm = time()
  if (ctm - last_io_interrupt>2) interrupt = 1
  if (interrupt) last_io_interrupt = ctm
  if (me_ivct) me_ivct--
  if (me_ivct == 1) player.vis = 0
  if (me_cal) {
    me_cal = 0
    calibme()
  }
  if (tdes) dosumm(ades)
  if (in_fight) {
    if (fighting.loc != player.loc) {
      fighting = -1
      in_fight = 0
    }
    if (fighting.active) {
      fighting = -1
      in_fight = 0
    }
    if (in_fight) {
      if (interrupt) {
        in_fight = 0
        hitplayer(fighting, wpnheld)
      }
    }
  }
  if ((iswornby(18, player.id)) || (randperc()<10)) {
    my_str++
    if(i_setup) calibme()
  }
  forchk()
  if (me_drunk>0) {
    me_drunk--
    if(!ail_dumb) gamecom("hiccup")
  }
  interrupt = 0
}

var me_drunk = 0

function openroom(n, mod) {
  let blob = ROOMS + (-n)
  let x = fopen(blob, mod)
  return x
}

var me_cal = 0

function rescom() {
  let dabk = ''
  if (my_lev < 10) {
    bprintf("What ?\n")
    return
  }
  broad("Reset in progress....\nReset Completed....\n")
  let b = openlock(RESET_DATA, "r")
  sec_read(b, objinfo, 0, 4*numobs)
  fcloselock(b);
  let i = time()
  let a = fopen(RESET_T, "w")
  fprintf(a, "Last Reset At %s\n", ctime(i))
  fclose(a)
  a = fopen(RESET_N, "w")
  fprintf(a, "%ld\n", i)
  fclose(a)
  resetplayers()
}

function lightning() {
  if (my_lev<10) {
    bprintf("Your spell fails.....\n")
    return
  }
  if (!brkword()) {
    bprintf("But who do you wish to blast into pieces....\n")
    return
  }
  let vic = fpbn(wordbuf)
  if (!vic) {
    bprintf("There is no one on with that name\n")
    return
  }
  sendsys(world.players[vic].name, player.name, -10001, world.players[vic].loc, "")
  syslog("%s zapped %s", player.name, world.players[vic].name)
  if (vic > 15) woundmn(vic, 10000) /* DIE */
  broad("\001dYou hear an ominous clap of thunder in the distance\n\001")
}

 eatcom()
    {
    long b;
    extern char wordbuf[];
    extern long curch;
    extern long mynum;
    extern long curch;
    extern long my_str;
    extern long my_lev;
    extern long my_sco;
    if(brkword()== -1)
       {
       bprintf("What\n");
       return;
       }

    if((curch== -609)&&(!strcmp(wordbuf,"water"))) strcpy(wordbuf,"spring");
    if(!strcmp(wordbuf,"from")) brkword();
    b=fobna(wordbuf);
    if(b== -1)
       {
       bprintf("There isn't one of those here\n");
       return;
       }

    switch(b)
       {
       case 11:
          bprintf("You feel funny, and then pass out\n");
          bprintf("You wake up elsewhere....\n");
          teletrap(-1076);
          break;
       case 75:
          bprintf("very refreshing\n");
          break;
       case 175:
          if(my_lev<3)
             {
             my_sco+=40;
             calibme();
             bprintf("You feel a wave of energy sweeping through you.\n");
             break;
             }
          else
             {
             bprintf("Faintly magical by the taste.\n");
             if(my_str<40) my_str+=2;
             calibme();
             }
          break;
       default:
          if(otstbit(b,6))
             {
             destroy(b);
             bprintf("Ok....\n");
             my_str+=12;
             calibme();
             }
          else
             bprintf("Thats sure not the latest in health food....\n");
          break;
       }
    }

 calibme()
    {
    /* Routine to correct me in user file */
    long  a;
    extern long mynum,my_sco,my_lev,my_str,my_sex,wpnheld;
    extern char globme[];
    long  b;
    char *sp[128];
    extern long i_setup;
    if(!i_setup) return;
    b=levelof(my_sco);
    if(b!=my_lev)
       {
       my_lev=b;
       bprintf("You are now %s ",globme);
       syslog("%s to level %d",globme,b);
       disle3(b,my_sex);
       sprintf(sp,"\001p%s\001 is now level %d\n",globme,my_lev);
       sendsys(globme,globme,-10113,ploc(mynum),sp);
       if(b==10) bprintf("\001f%s\001",GWIZ);
       }
    setplev(mynum,my_lev);
    if(my_str>(30+10*my_lev)) my_str=30+10*my_lev;
    setpstr(mynum,my_str);
    setpsex(mynum,my_sex);
    setpwpn(mynum,wpnheld);
    }

 levelof(score)
    {
    extern long my_lev;
    score=score/2;  /* Scaling factor */
    if(my_lev>10) return(my_lev);
    if(score<500) return(1);
    if(score<1000) return(2);
    if(score<3000) return(3);
    if(score<6000) return(4);
    if(score<10000) return(5);
    if(score<20000) return(6);
    if(score<32000) return(7);
    if(score<44000) return(8);
    if(score<70000) return(9);
    return(10);
    }

 playcom()
    {
    extern char wordbuf[];
    extern long curch;
    extern long mynum;
    long  a,b;
    if(brkword()== -1)
       {
       bprintf("Play what ?\n");
       return;
       }
    a=fobna(wordbuf);
    if(a== -1)
       {
       bprintf("That isn't here\n");
       return;
       }
    if(!isavl(a))
       {
       bprintf("That isn't here\n");
       return;
       }
    }

 getreinput(blob)
    {
    extern long stp;
    extern char strbuf[];
    strcpy(blob,"");
    while(strbuf[stp]==' ') stp++;
    while(strbuf[stp]) addchar(blob,strbuf[stp++]);
    }

 shoutcom()
    {
    extern long curch,my_lev;
    extern char globme[];
    auto char blob[200];
    if(chkdumb()) return;
    getreinput(blob);
    if(my_lev>9)
       sendsys(globme,globme,-10104,curch,blob);
    else
       sendsys(globme,globme,-10002,curch,blob);
    bprintf("Ok\n");
    }

 saycom()
    {
    extern long curch;
    extern char globme[];
    auto char blob[200];
    if(chkdumb()) return;
    getreinput(blob);
    sendsys(globme,globme,-10003,curch,blob);
    bprintf("You say '%s'\n",blob);
    }

 tellcom()
    {
    extern long curch;
    extern char wordbuf[],globme[];
    char blob[200];
    long  a,b;
    if(chkdumb()) return;
    if(brkword()== -1)
       {
       bprintf("Tell who ?\n");
       return;
       }
    b=fpbn(wordbuf);
    if(b== -1)
       {
       bprintf("No one with that name is playing\n");
       return;
       }
    getreinput(blob);
    sendsys(pname(b),globme,-10004,curch,blob);
    }

 scorecom()
    {
    extern long my_str,my_lev,my_sco;
    extern long my_sex;
    extern char globme[];
    if(my_lev==1)
       {
       bprintf("Your strength is %d\n",my_str);
       return;
       }
    else
       bprintf("Your strength is %d(from %d),Your score is %d\nThis ranks you as %s ",
          my_str,50+8*my_lev,my_sco,globme);
    disle3(my_lev,my_sex);
    }

 exorcom()
    {
    long  x,a;
    extern long curch;
    extern long my_lev;
    extern char globme[];
    extern char wordbuf[];
    if(my_lev<10)
       {
       bprintf("No chance....\n");
       return;
       }
    if(brkword()== -1)
       {
       bprintf("Exorcise who ?\n");
       return;
       }
    x=fpbn(wordbuf);
    if(x== -1)
       {
       bprintf("They aren't playing\n");
       return;
       }
       if(ptstflg(x,1))
       {
       	bprintf("You can't exorcise them, they dont want to be exorcised\n");
       	return;
       	}
    syslog("%s exorcised %s",globme,pname(x));
    dumpstuff(x,ploc(x));
    sendsys(pname(x),globme,-10010,curch,"");
    pname(x)[0]=0;
    }

 givecom()
    {
    auto long  a,b;
    auto long  c,d;
    extern char wordbuf[];
    if(brkword()== -1)
       {
       bprintf("Give what to who ?\n");
       return;
       }
    if(fpbn(wordbuf)!= -1) goto obfrst;
    a=fobna(wordbuf);
    if(a== -1)
       {
       bprintf("You aren't carrying that\n");
       return(0);
       }
    /* a = item giving */
    if(brkword()== -1)
       {
       bprintf("But to who ?\n");
       return;
       }
    if(!strcmp(wordbuf,"to"))
       {
       if(brkword()== -1)
          {
          bprintf("But to who ?\n");
          return;
          }
       }
    c=fpbn(wordbuf);
    if(c== -1)
       {
       bprintf("I don't know who %s is\n",wordbuf);
       return;
       }
    dogive(a,c);
    return;
    obfrst:/* a=player */
    a=fpbn(wordbuf);
    if(a== -1)
       {
       bprintf("Who is %s\n",wordbuf);
       return;
       }
    if(brkword()== -1)
       {
       bprintf("Give them what ?\n");
       return;
       }
    c=fobna(wordbuf);
    if(c== -1)
       {
       bprintf("You are not carrying that\n");
       return;
       }
    dogive(c,a);
    }

 dogive(ob,pl)
    {
    long  x;
    auto z[32];
    extern char globme[];
    extern long my_lev,curch;
    extern long mynum;
    if((my_lev<10)&&(ploc(pl)!=curch))
       {
       bprintf("They are not here\n");
       return;
       }
    if(!iscarrby(ob,mynum))
       {
       bprintf("You are not carrying that\n");
       }
    if(!cancarry(pl))
       {
       bprintf("They can't carry that\n");
       return;
       }
    if((my_lev<10)&&(ob==32))
       {
       bprintf("It doesn't wish to be given away.....\n");
       return;
       }
    setoloc(ob,pl,1);
    sprintf(z,"\001p%s\001 gives you the %s\n",globme,oname(ob));
    sendsys(pname(pl),globme,-10011,curch,z);
    return;
    }

 stealcom()
    {
    extern long mynum;
    extern long curch,my_lev;
    extern char wordbuf[];
    long  a,b;
    long  c,d;
    char x[128];
    long e,f;
    extern char globme[];
    char tb[128];
    if(brkword()== -1)
       {
       bprintf("Steal what from who ?\n");
       return;
       }
    strcpy(x,wordbuf);
    if(brkword()== -1)
       {
       bprintf("From who ?\n");
       return;
       }
    if(!strcmp(wordbuf,"from"))
       {
       if(brkword()== -1)
          {
          bprintf("From who ?\n");
          return;
          }
       }
    c=fpbn(wordbuf);
    if(c== -1)
       {
       bprintf("Who is that ?\n");
       return;
       }
    a=fobncb(x,c);
    if(a== -1)
       {
       bprintf("They are not carrying that\n");
       return;
       }
    if((my_lev<10)&&(ploc(c)!=curch))
       {
       bprintf("But they aren't here\n");
       return;
       }
    if(ocarrf(a)==2)
       {
       bprintf("They are wearing that\n");
       return;
       }
    if(pwpn(c)==a)
       {
       bprintf("They have that firmly to hand .. for KILLING people with\n");
       	return;
       }
    if(!cancarry(mynum))
       {
       bprintf("You can't carry any more\n");
       return;
       }
    time(&f);
    srand(f);
    f=randperc();
    e=10+my_lev-plev(c);
    e*=5;
    if(f<e)
       {
       sprintf(tb,"\001p%s\001 steals the %s from you !\n",globme,oname(a));
       if(f&1){
       	 sendsys(pname(c),globme,-10011,curch,tb);
       	 if(c>15) woundmn(c,0);
       	}
       setoloc(a,mynum,1);
       return;
       }
    else
       {
       bprintf("Your attempt fails\n");
       return;
       }
    }

 dosumm(loc)
    {
    char ms[128];
    extern long curch;
    extern char globme[];
    sprintf(ms,"\001s%s\001%s vanishes in a puff of smoke\n\001",globme,globme);
    sendsys(globme,globme,-10000,curch,ms);
    sprintf(ms,"\001s%s\001%s appears in a puff of smoke\n\001",globme,globme);
    dumpitems();
    curch=loc;
    sendsys(globme,globme,-10000,curch,ms);
    trapch(curch);
    }

 tsscom()
    {
    char s[128];
    extern long my_lev;
    if(my_lev<10000)
       {
       bprintf("I don't know that verb\n");
       return;
       }
    getreinput(s);
    closeworld();
    keysetback();
    if(getuid()==geteuid()) system(s);
    else bprintf("Not permitted on this ID\n");
    keysetup();
    }

function rmeditcom() {
  let ms = ''
  if (!ptstflg(player.id, 3)) {
    bprintf("Dum de dum.....\n")
    return
  }

  ms = '\001s' + player.name + '\001' + player.name + ' fades out of reality\n\001'
  sendsys(this.name, this.name, -10113, 0, ms) /* Info */
  player.pos = -2/* CODE NUMBER */
  player.update()
  pbfr()
  closeworld()
  if (!chdir(ROOMS)) bprintf("Warning: Can't CHDIR\n")
  ms = '/cs_d/aberstudent/yr2/hy8/.sunbin/emacs'
  system(ms)
  player.pos = -1
  openworld()
  if (!fpbns(player.name)) {
    player.loseme()
    crapup("You have been kicked off")
  }
  ms = '\001s' + player.name + '\001' + player.name + ' re-enters the normal universe\n\001'
  sendsys(player.name, player.name, -10113, 0, ms)
  rte()
}

function u_system() {
  let x = ''
  if (me.lev < 10) {
    bprintf("You'll have to leave the game first!\n")
    return
  }
  player.pos = -2
  player.update()
  x = '\001s' + player.name + '\001' + player.name + ' has dropped into BB\n\001'
  sendsys(player.name, player.name, -10113, 0, x)
  closeworld()
  system("/cs_d/aberstudent/yr2/iy7/bt")
  openworld()
  player.pos = -1
  if (fpbns(player.name)) {
    loseme()
    crapup("You have been kicked off")
  }
  rte()
  openworld()
  x = '\001s' + player.name + '\001' + player.name + ' has returned to AberMud\n\001'
  sendsys(player.name, player.name, -10113, 0, x)
}

function inumcom() {
  if (me.lev < 10000) {
    bprintf("Huh ?\n")
    return
  }
  if (!brkword()) {
    bprintf("What...\n")
    return
  }
  bprintf("Item Number is %d\n", fobn(wordbuf))
}

function updcom() {
  let x = ''
  if (me.lev < 10) {
    bprintf("Hmmm... you can't do that one\n")
    return
  }
  player.loseme()
  x = '[ ' + player.name + ' has updated ]\n'
  sendsys(player.name, player.name, -10113, 0, x)
  closeworld()
  x = player.name
  execl(EXE, '   --{----- ABERMUD -----}--   ', x, 0)  /* GOTOSS eek! */
  bprintf("Eeek! someones pinched the executable!\n")
}

function becom() {
  let x = ''
  let x2 = ''
  if (me.lev < 10) {
    bprintf("Become what ?\n")
    return
  }
  getreinput(x2)
  if (!x2) {
    bprintf("To become what ?, inebriated ?\n")
    return
  }
  x = player.name + ' has quit, via BECOME\n'
  sendsys(null, null, -10113, 0, x)
  keysetback()
  player.loseme()
  closeworld()
  x = '-n' + x2
  execl(EXE2, '   --}----- ABERMUD ------   ', x, 0)	/* GOTOSS eek! */
  bprintf("Eek! someone's just run off with mud!!!!\n")
}

function systat() {
  if (me.lev < 10000000) {
    bprintf("What do you think this is a DEC 10 ?\n")
    return
  }
}

function convcom() {
  cmdMode = 1
  bprintf("Type '**' on a line of its own to exit converse mode\n")
}

function shellcom() {
  if (me.lev < 10000) {
    bprintf("There is nothing here you can shell\n")
    return
  }
  cmdMode = 2
  bprintf("Type ** on its own on a new line to exit shell\n")
}

function rawcom() {
  let x = ''
  let y = ''
  if (me.lev < 10000) {
    bprintf("I don't know that verb\n")
    return
  }
  getreinput(x)
  if ((me.lev == 10033) && (x[0] == '!')) {
    broad(x+1)
    return
  } else {
    y = '** SYSTEM : ' + x + '\n\007\007'
    broad(y)
  }
}

function rollcom() {
  let a = 0
  let b = ohereandget(a)
  if (!b) return
  if (a == 122) return
  if (a == 123) return gamecom('push pillar')
  bprintf("You can't roll that\n")
}

var brmode = 0

function debugcom() {
  if (me.lev < 10000) {
    bprintf("I don't know that verb\n")
    return
  }
  debug2()
}

function bugcom() {
	let x = ''
  getreinput(x)
	syslog("Bug by %s : %s", player.name, x)
}

function typocom() {
  let x = ''
  let y = ''
  y = player.name + ' in ' + player.lock
  getreinput(x)
	syslog("Typo by %s : %s", y, x)
}

function look_cmd() {
	let a = 0
  let brhold = 0
  if (!brkword()) {
    brhold = brmode
    brmode = 0
    lookin(player.loc)
    brmode = brhold
    return
  }
  if (wordbuf == 'at') {
    examcom()
    return
  }
  if ((wordbuf != 'in') && (wordbuf != 'into') {
    return
  }
  if (!brkword()) {
    bprintf("In what ?\n")
    return
  }
  a = fobna(wordbuf)
  if (a == -1) {
    bprintf("What ?\n")
    return
	}
	if (!otstbit(a, 14)) {
    bprintf("That isn't a container\n")
		return
	}
	if (otstbit(a, 2) && (state(a) != 0)) {
		bprintf("It's closed!\n")
		return
	}
	bprintf("The %s contains:\n", o[a].name)
  aobjsat(a, 3)
}

function set_ms(x) {
	if ((me.lev < 10) && (player.name != "Lorry")) {
		bprintf("No way !\n")
	} else {
		getreinput(x)
	}
	return
}

function setmincom() { set_ms(min_ms) }
function setincom() { set_ms(in_ms) }
function setoutcom() { set_ms(out_ms) }
function setmoutcom() {	set_ms(mout_ms) }
function setherecom() { set_ms(here_ms) }

function digcom() {
  if ((o[186].loc == player.loc) && (isdest(186))) {
    bprintf("You uncover a stone slab!\n")
    ocreate(186)
    return
	}
	if ((this.loc != -172) && (this.loac != -192)) {
    bprintf("You find nothing.\n")
		return
	}
	if (state(176) == 0) {
		bprintf("You widen the hole, but with little effect.\n")
		return
	}
  o[176].state = 0
  bprintf("You rapidly dig through to another passage.\n")
}

function emptycom() {
  let a = 0
  let b = ohereandget(a)
  if (!b) return
  b = 0
	while (b < numobs) {
    if (iscontin(b, a)) {
      setoloc(b, player.id, 1)
      bprintf("You empty the %s from the %s\n", o[b].name, o[a].name)
      let x = 'drop ' + o[b].name
      gamecom(x)
      pbfr()
			openworld()
		}
		b++
	}
}
