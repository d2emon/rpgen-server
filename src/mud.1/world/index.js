var world = {
  isOpen: false,
  numobs: 16,
  objinfo: [],
  ublock: [],
  filename: '',
  perm: '',

  sec_read: function (arg1, arg2) {
    console.log('\t<<<\tSEC_READ(' + this + ', res, ' + arg1 + ', ' + arg2 + ')')
    return []
  },
  sec_write: function (data, arg1, arg2) {
    console.log('\t>>>\tSEC_WRITE(' + this + ', ' + data + ', ' + arg1 + ', ' + arg2 + ')')
  },

  load: function () {
    if (this.isOpen) return this.isOpen

    this.filename = '/usr/tmp/-iy7AM'
    this.perm = 'r+'
    this.isOpen = true

    if (!this.isOpen)
      throw Error('Cannot find World file')

    this.loadData()

    return this.isOpen
  },
  save: function () {
    if (!this.isOpen) return

    this.saveData()

    this.filename = ''
    this.perm = ''
    this.isOpen = false
  },

  loadEnd: function () {
    return this.sec_read(0, 2)
  },
  loadData: function () {
    this.objinfo = this.sec_read(400, 4 * this.numobs)
    this.ublock = this.sec_read(350, 16 * 48)
  },
  saveData: function () {
    this.sec_write(this.objinfo, 400, 4 * this.numobs)
  	this.sec_write(this.ublock, 350, 16 * 48)
  }
}

module.exports = {
  load: function () { return world.load() },
  save: function () { world.save() },

  findend: function () { return world.loadEnd() },
  readmsg: function (ct) { console.log('READMSG(' + ct + ')') }
}
