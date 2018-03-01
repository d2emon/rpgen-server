var sig_active = true
function alarm(t) { console.log('\tALARM(' + t + ')') }
function sig_ignore() {}

var key = require('../key')
var player = require('../player')
var crapup = require('./crapup')

/*
sig_alon()
{
	extern int sig_occur();
	sig_active=1;
	signal(SIGALRM,sig_occur);
	alarm(2);
}
*/

function sig_aloff() {
  sig_active = false
  process.on('SIGALRM', sig_ignore)
  alarm(2147487643)
}

// Signals

/*
sig_occur()
{
	extern char globme[];
	if(sig_active==0) return;
	sig_aloff();
	openworld();
	interrupt=1;
	rte(globme);
	interrupt=0;
	on_timing();
	closeworld();
	key_reprint();
	sig_alon();
}
*/

function sig_ctrlc() {
  console.log('^C\n')
  if (player.in_fight) return
  sig_aloff()
	player.loseme()
	crapup('Byeeeeeeeeee  ...........')
}

function sig_oops() {
  sig_aloff()
 	player.loseme()
 	key.keysetback()
 	process.exit(255)
}

function sig_init() {
  process.on('beforeExit', sig_ctrlc)
  process.on('exit', sig_oops)

	process.on('SIGHUP', sig_oops)
	process.on('SIGINT', sig_ctrlc)
	process.on('SIGTERM', sig_ctrlc)
	process.on('SIGTSTP', sig_ignore)
	process.on('SIGQUIT', sig_ignore)
  process.on('SIGCONT', sig_oops)
}

module.exports = {
  sig_init,
}
