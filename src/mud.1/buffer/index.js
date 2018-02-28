function block_alarm() { console.log('\tBLOCK_ALARM()') }
function unblock_alarm() { console.log('\tUNBLOCK_ALARM()') }
function dcprnt(buff, f) { console.log('\tDCPRNT(' + buff + ', ' + f + ')') }
function fcloselock(f) { console.log('\tFCLOSELOCK(' + f + ')') }
function viewsnoop() { console.log('\tVIEWSNOOP()') }
var sysbuf = ''
var pr_due = 0
var pr_qcr = 0
var iskb = 0
var log_fl = null
var snoopd = null
var snoopt = null

var world = require('../world')

function makebfr() {
  sysbuf = '' /* 4K of chars should be enough for worst case */
}

function pbfr() {
  console.log('\tPBFR()')
  block_alarm()
  world.save()
  if (sysbuf) pr_due = 1
  if (sysbuf && pr_qcr) console.log('\n')
  pr_qcr = 0
  if (log_fl) {
    iskb = 0
    dcprnt(sysbuf, log_fl)
  }
  if (snoopd) {
    fln = opensnoop(snoopd.name, 'a')
    if (fln) {
      iskb = 0
      dcprnt(sysbuf, fln)
      fcloselock(fln)
    }
  }
  iskb = 1
  dcprnt(sysbuf, 'stdout')
  sysbuf = '' /* clear buffer */
  if (snoopt) viewsnoop()
  unblock_alarm()
}

module.exports = {
  makebfr: makebfr,
  pbfr: pbfr
}
