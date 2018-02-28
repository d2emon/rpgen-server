/*
OBJ =	tk.o parse.o objsys.o extra.o magic.o blood.o weather.o obdat.o new1.o\
support.o zones.o mobile.o bprintf.o bbc.o blib.o opensys.o
*/
var gamego = require('./gamego')
var crapup = require('./gamego/crapup');
/*
gamego.o ndebug.o\
key.o packer.o newuaf.o frob.o flock.o
INCL =	object.h files.h System.h
*/
try {
  gamego(0, 'Phantom')
} catch(err) {
  console.error(err)
  crapup(err.message)
}
