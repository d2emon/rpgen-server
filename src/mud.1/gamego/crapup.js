var pr_due = 0

var key = require('../key')
var buffer = require('../buffer')

function crapup(text) {
  dashes = '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'
  buffer.pbfr()
  pr_due = 0  /* So we dont get a prompt after the exit */
  key.keysetback()
  console.log('\n' + dashes + '\n')
  console.log('\n' + text + '\n')
  console.log('\n' + dashes + '\n')
  process.exit(0)
}

module.exports = crapup
