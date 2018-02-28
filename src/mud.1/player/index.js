function getuid() { return 'UID' }
function getpwuid(user) { return { name: user + '->PWUID->NAME' } }

var globme = ''
function loseme() { console.log('\tLOSEME()') }
function putmeon() { console.log('\tPUTMEON()') }
function rte() { console.log('\tRTE()') }
function special(cmd) { console.log('\tSPECIAL(' + cmd + ')') }
function sendmsg() { console.log('\tSENDMSG()') }



function cuserid() {
  /*
  	extern char *strchr();
  	getpw(getuid(),ary);
  	*strchr(ary,':')=0;
  */
  return getpwuid(getuid()).name
}

module.exports = {
  name: globme,
  loseme: loseme,
  putmeon: putmeon,
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
