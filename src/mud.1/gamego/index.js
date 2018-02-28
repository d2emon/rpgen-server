var player = require('../player')
var signals = require('./signals')
var key = require('../key')
var talker = require('../talker')

var tty = 0

// extern FILE *openlock();
var argv_p = []

function main(progname, username) {
  signals.sig_init()
  argv_p = [progname, username]
  if (!username) {
    console.log('Args!\n')
    return 0
  }
  console.log('Entering Game ....\n')
  tty = 0
  /* if(tty==4) {initbbc();initscr();topscr();} */
  player.load(username)
  key.keysetup()
  talker(player)
  console.log('===========================================================')
}

/*
char privs[4];

listfl(name)
char *name;
{
FILE *a;
char b[128];
a=openlock(name,"r+");
while(fgets(b,128,a)) printf("%s\n",b);
fcloselock(a);
}
*/

//char *getkbd(s,l)   /* Getstr() with length limit and filter ctrl */
/*
 char *s;
 int l;
    {
    char c,f,n;
    f=0;c=0;
    while(c<l)
       {
       regec:n=getchar();
       if ((n<' ')&&(n!='\n')) goto regec;
       if (n=='\n') {s[c]=0;f=1;c=l-1;}
       else
          s[c]=n;
       c++;
       }
    if (f==0) {s[c]=0;while(getchar()!='\n');}
    return(s);
    }
*/

/*
long sig_active=0;

unblock_alarm()
{
	extern int sig_occur();
	signal(SIGALRM,sig_occur);
	if(sig_active) alarm(2);
}

block_alarm()
{
	signal(SIGALRM,SIG_IGN);
}

long interrupt=0;
*/

module.exports = main
