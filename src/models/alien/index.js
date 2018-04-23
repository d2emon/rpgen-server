var models = require('../index')
var getAlien = require('./alien-type')
var getInvertebrate = require('./type-invertebrate')
var getFish = require('./type-fish')
var getAmphibian = require('./type-amphibian')
var getReptile = require('./type-reptile')
var getBird = require('./type-bird')
var getMammal = require('./type-mammal')
var getAquatic = require('./type-aquatic')


var names3 = require('../../../data/alien-eyes-count.json')
var names4 = require('../../../data/alien-eyes-sit.json')
var names5 = require('../../../data/alien-eyes-sight.json')
var names6 = require('../../../data/alien-eyes-see.json')

var names10 = ["very thick and rough.","smooth and thin.","thin, but strong.","thin and fairly weak.","very thick and very strong.","very strong, but not very thick.","course, thick and strong.","smooth, yet strong.","smooth, elastic and quite strong.","elastic and strong."];
var names11 = ["It's covered in thick fur.","It's covered lightly in small hairs.","It's covered lightly in long, coarse hairs.","It's covered in thick, course fur.","It's covered long, wavy hairs.","It's covered short hairs.","It's covered short, curly hairs.","It's covered in nothing but a few hairs on their hands.","It's covered in nothing but hair on their heads, arms and legs.","It's covered in nothing, except for hair on their heads.","It's covered in nothing, except for hairs on their heads, chests, arms and legs.","It's covered in nothing but a few hairs on their heads.","It's covered lightly in tiny hairs.","It's covered in thick, short hairs.","It's covered in soft, short hairs."];

var names12a = ["black","blue","bronze","brown","gold","grey","orange","pink","purple","red","silver","white","yellow","dark blue","dark bronze","dark brown","dark gold","dark grey","dark orange","dark pink","dark purple","dark red","dark silver","dark yellow","light blue","light bronze","light brown","light gold","light grey","light orange","light pink","light purple","light red","light silver","light yellow"];
var names12b = [", black",", blue",", bronze",", brown",", gold",", grey",", orange",", pink",", purple",", red",", silver",", white",", yellow",", dark blue",", dark bronze",", dark brown",", dark gold",", dark grey",", dark orange",", dark pink",", dark purple",", dark red",", dark silver",", dark yellow",", light blue",", light bronze",", light brown",", light gold",", light grey",", light orange",", light pink",", light purple",", light red",", light silver",", light yellow","","","","","","","","","","","","","","","","","","","","","","","","",""];
var names12c = [", black",", blue",", bronze",", brown",", gold",", grey",", orange",", pink",", purple",", red",", silver",", white",", yellow",", dark blue",", dark bronze",", dark brown",", dark gold",", dark grey",", dark orange",", dark pink",", dark purple",", dark red",", dark silver",", dark yellow",", light blue",", light bronze",", light brown",", light gold",", light grey",", light orange",", light pink",", light purple",", light red",", light silver",", light yellow","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
var names12d = [" and blac			k"," and blue"," and bronze"," and brown"," and gold"," and grey"," and orange"," and pink"," and purple"," and red"," and silver"," and white"," and yellow"," and dark blue"," and dark bronze"," and dark brown"," and dark gold"," and dark grey"," and dark orange"," and dark pink"," and dark purple"," and dark red"," and dark silver"," and dark yellow"," and light blue"," and light bronze"," and light brown"," and light gold"," and light grey"," and light orange"," and light pink"," and light purple"," and light red"," and light silver"," and light yellow"];
var names13 = ["darker","lighter","dull","dim","pale","faded"];

var names14 = ["more arrogant","bigger","bossier","braver","bulkier","faster","friendlier","heavier","lazier","more adventurous","more confident","more cunning","more dependable","more emotional","more gracious","more helpful","more honorable","more humble","more impulsive","more independent","more obedient","more obnoxious","more optimistic","more self-centered","more self-reliant","more vulgar","smarter","sneakier","stronger","taller"];
var names15 = ["more vibrant","less vibrant","more varied","less varied","darker","lighter"];

function generateAlienType () {
	var random1 = parseInt(Math.floor((Math.random() * 8)))
  if (random1 === 1) {
    return getAquatic()
  }
  else if (random1 === 2) {
    return getAmphibian()
  }
  else if(random1 === 3){
    return getReptile()
  }
  else if(random1 === 4){
    return getFish()
  }
  else if(random1 === 5){
    return getInvertebrate()
  }
  else if(random1 === 6){
    return getBird()
  }
	return getMammal()
}

function generate () {
	var data = generateAlienType()
	var alien = data.generate()

  var random2a = models.generate(data.names2a)
  var random2b = models.generate(data.names2b)
  var random2c = models.generate(data.names2c)

  var random3 = models.generate(names3)
  var random4 = models.generate(names4)

  var random5a = models.generate(names5)
  var random5b = models.generate(names5)
  while (random5b === random5a) {
    random5b = models.generate(names5)
  }

  var random6a = models.generate(names6)
  var random6b = models.generate(names6)
  while (random6b === random6a) {
    random6b = models.generate(names6)
  }

  var random7a = models.generate(data.names7a)
  var random7b = models.generate(data.names7b)
  var random8 = models.generate(data.names8)
  var random9 = models.generate(data.names9)
  var random10 = models.generate(names10)
  var random11 = models.generate(data.names11)
  var random12a = models.generate(names12a)
  var random12b = models.generate(names12b)
  while(random12b === random12a){
    random12b = models.generate(names12b)
  }
  var random12c = models.generate(names12c)
  while(random12c === random12a || random12c === random12b){
    random12c = models.generate(names12c)
  }
  var random12d = models.generate(names12c)
  while(random12d === random12a || random12d === random12b || random12d === random12c){
    random12d = models.generate(names12c)
  }
  var random12e = models.generate(names12d)
  while(random12e === random12a || random12e === random12b || random12e === random12c || random12e === random12d){
    random12e = models.generate(names12d)
  }
  var random13 = parseInt(Math.floor((Math.random() * names13.length)));
  var random14a = parseInt(Math.floor((Math.random() * names14.length)));
  var random14b = parseInt(Math.floor((Math.random() * names14.length)));
  while(random14b === random14a){
    random14b = parseInt(Math.floor((Math.random() * names14.length)));
  }
  var random15 = parseInt(Math.floor((Math.random() * names15.length)));

  var name = alien.describe()

  name += 'У них ' + random3 + ', которые ' + random4 + ' и придают им ' + random5a + ' вид. '
  name += 'Их зрение ' + random6a + '.\n'

  name += 'Их ' + random7a + random7b + ' часто придают этим инопланетянам ' + random5b + ' вид, но это обманчивое впечатление.<br />'
  name += 'Их уши ' + random8 + ', а их слух ' + random6b + '. '
  name += random9 + '\n'

  name += 'Их кожа ' + random10 + ' ' + random11 + '<br />'
  name += data.names11a + ' в основном ' + random12a + random12b + random12c + random12d + random12e + ', и с возрастом становится ' + names13[random13] + '.\n'

  name += 'Их мужчины обычно ' + names14[random14a] + ' чем их женщины и their colors are ' + names15[random15] + '. '
  name += 'The females, however, are usually ' + names14[random14b] + '.'

  return {
		details: alien,
		description: name
	}
}

module.exports = {
  generate
}
