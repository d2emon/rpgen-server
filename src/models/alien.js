var models = require('./index')

var names3 = ["two eyes","four eyes","six eyes","two eyes","four eyes","two eyes"];
var names4 = ["deep","narrowly","buried","far","rooted","well","low","high","sunken","lightly","thightly","graciously","concealed","delicately","elegantly","gracefully"];
var names5 = ["friendly","angry","arrogant","reserved","serene","compased","distant","modest","restrained","cautious","gentle","withdrawn","annoyed","nervous","agitated","bold","excited","troubled","upset","formal","evil","trustworthy","untrustworthy","sly","honest","dishonest","slick","elusive","calculating","intelligent"];
var names6 = ["excellent","fairly good","quite good","not the best","amazing","astonishing","a bit poor","great at distances","not too great at distances","impressive","average","not that great","among the best","almost among the best","perhaps the best of all species"];
			
var names7a = ["wide mouths","small mouths","long mouths","huge mouths","thin mouths","narrow mouths","enormous mouths"];
var names7b = [" and huge noses"," and small noses"," and wide noses"," and long noses"," and enormous noses"," and thin noses"," and almost hidden noses"," and lack of a visible nose"," and tiny noses"," and narrow noses"];
			
var names8 = ["almost invisible","long and pointy","small","huge","large","long","quite long","a bit small","wide and long","long and narrow","will hidden","small and pointy","wide and large","long and hanging","small and stubby"];

var names9 = ["They also have two horns on their heads.","They also have three horns on their heads.","They also have four horns on their heads.","They also have horns covering their face.","They also have horns running across their backs.","They also have small horns on their hands.","They also have small horns on their hands, arms and legs.","They also have two small horns on their elbows.","They also have two horns on their heels.","They also have small horns on their feet.","They also have small horns on their hands and feet.","They also have small horns across their chests.","They also have small horns across their body.","They also have small horns across their chests and backs.","They also have one long horn on their head.","","","","",""];
			
var names10 = ["very thick and rough.","smooth and thin.","thin, but strong.","thin and fairly weak.","very thick and very strong.","very strong, but not very thick.","course, thick and strong.","smooth, yet strong.","smooth, elastic and quite strong.","elastic and strong."];
var names11 = ["It's covered in thick fur.","It's covered lightly in small hairs.","It's covered lightly in long, coarse hairs.","It's covered in thick, course fur.","It's covered long, wavy hairs.","It's covered short hairs.","It's covered short, curly hairs.","It's covered in nothing but a few hairs on their hands.","It's covered in nothing but hair on their heads, arms and legs.","It's covered in nothing, except for hair on their heads.","It's covered in nothing, except for hairs on their heads, chests, arms and legs.","It's covered in nothing but a few hairs on their heads.","It's covered lightly in tiny hairs.","It's covered in thick, short hairs.","It's covered in soft, short hairs."];
			
var names12a = ["black","blue","bronze","brown","gold","grey","orange","pink","purple","red","silver","white","yellow","dark blue","dark bronze","dark brown","dark gold","dark grey","dark orange","dark pink","dark purple","dark red","dark silver","dark yellow","light blue","light bronze","light brown","light gold","light grey","light orange","light pink","light purple","light red","light silver","light yellow"];
var names12b = [", black",", blue",", bronze",", brown",", gold",", grey",", orange",", pink",", purple",", red",", silver",", white",", yellow",", dark blue",", dark bronze",", dark brown",", dark gold",", dark grey",", dark orange",", dark pink",", dark purple",", dark red",", dark silver",", dark yellow",", light blue",", light bronze",", light brown",", light gold",", light grey",", light orange",", light pink",", light purple",", light red",", light silver",", light yellow","","","","","","","","","","","","","","","","","","","","","","","","",""];
var names12c = [", black",", blue",", bronze",", brown",", gold",", grey",", orange",", pink",", purple",", red",", silver",", white",", yellow",", dark blue",", dark bronze",", dark brown",", dark gold",", dark grey",", dark orange",", dark pink",", dark purple",", dark red",", dark silver",", dark yellow",", light blue",", light bronze",", light brown",", light gold",", light grey",", light orange",", light pink",", light purple",", light red",", light silver",", light yellow","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
var names12d = [" and blac			k"," and blue"," and bronze"," and brown"," and gold"," and grey"," and orange"," and pink"," and purple"," and red"," and silver"," and white"," and yellow"," and dark blue"," and dark bronze"," and dark brown"," and dark gold"," and dark grey"," and dark orange"," and dark pink"," and dark purple"," and dark red"," and dark silver"," and dark yellow"," and light blue"," and light bronze"," and light brown"," and light gold"," and light grey"," and light orange"," and light pink"," and light purple"," and light red"," and light silver"," and light yellow"];
var names13 = ["darker","lighter","dull","dim","pale","faded"];
			
var names14 = ["more arrogant","bigger","bossier","braver","bulkier","faster","friendlier","heavier","lazier","more adventurous","more confident","more cunning","more dependable","more emotional","more gracious","more helpful","more honorable","more humble","more impulsive","more independent","more obedient","more obnoxious","more optimistic","more self-centered","more self-reliant","more vulgar","smarter","sneakier","stronger","taller"];
var names15 = ["more vibrant","less vibrant","more varied","less varied","darker","lighter"];

function getMammal () {
  return {
    title: 'млекопитающие',
    names2a: require('../../data/alien-mammal-parts-1.json'),
    names2b: require('../../data/alien-mammal-parts-2.json'),
    names2c: require('../../data/alien-mammal-parts-3.json'),
    names7a: names7a,
    names7b: names7b,
    names8: names8,
    names9: names9,
    names11: names11,
    names11a: "Их кожа "
  }
}

function getAquatic () {
  data = getMammal()
  data.title = 'водные млекопитающие'
  data.names2a = require('../../data/alien-aquatic-parts-1.json'),
  data.names2b = require('../../data/alien-aquatic-parts-2.json'),
  data.names2c = require('../../data/alien-aquatic-parts-3.json'),
  data.names9 = ["They also have two horns on their heads.","They also have three horns on their heads.","They also have four horns on their heads.","They also have horns running across their backs.","They also have one long horn on their head.","","","","",""]
  data.names11 = [""]
  return data
}

function getAmphibian () {
  data = getMammal()
  data.title = 'амфибии'
  data.names2c = require('../../data/alien-amphibian-parts-3.json'),
  data.names11 = ["It's covered in a thin layer of mucous.","It's covered in a thick layer of mucous.","It's covered in a very thin layer of mucous.","It's covered in a very thick layer of mucous.","It's covered lightly in mucous."]
  return data
}

function getReptile () {
  data = getMammal()
  data.title = 'рептилии'
  data.names2a = require('../../data/alien-reptile-parts-1.json')
  data.names2b = [""]
  data.names2c = require('../../data/alien-reptile-parts-3.json')
  data.names11 = ["It's covered in thin, coarse scales.","It's covered in large, coarse scales.","It's covered in large, smooth scales.","It's covered in large, strong scales.","It's covered in small, coarse scales.","It's covered in small, smooth scales.","It's covered in small, strong scales.","It's covered in strong, hard scales.","It's covered in thick, coarse scales.","It's covered in thick, strong scales."]
  data.names11a = "Их чешуя "
  return data
}

function getFish () {
  data = getMammal()
  data.title = 'рыбы'
  data.names2a = require('../../data/alien-fish-parts-1.json')
  data.names2b = require('../../data/alien-fish-parts-2.json')
  data.names2c = require('../../data/alien-fish-parts-3.json')
  data.names7b = [" and small noses"," and wide noses"," and long noses"," and thin noses"," and almost hidden noses"," and lack of a visible nose"," and tiny noses"," and narrow noses"];
  data.names8 = ["almost invisible","small","will hidden","small and pointy","small and stubby"];
  data.names11 = ["It's covered in thin, coarse scales.","It's covered in large, coarse scales.","It's covered in large, smooth scales.","It's covered in large, strong scales.","It's covered in small, coarse scales.","It's covered in small, smooth scales.","It's covered in small, strong scales.","It's covered in strong, hard scales.","It's covered in thick, coarse scales.","It's covered in thick, strong scales."];
  data.names11a = "Их чешуя "
  return data
}

function getInvertebrate () {
  data = getMammal()
  data.title = 'беспозвоночнные'
  data.names2a = require('../../data/alien-invertebrate-parts-1.json')
  data.names2b = require('../../data/alien-invertebrate-parts-2.json')
  data.names2c = require('../../data/alien-invertebrate-parts-3.json')
  return data
}

function getBird () {
  data = getMammal()
  data.title = 'птицы'
  data.names2a = require('../../data/alien-bird-parts-1.json')
  data.names2b = require('../../data/alien-bird-parts-2.json')
  data.names2c = require('../../data/alien-bird-parts-3.json')
  data.names7a = ["long beaks","sharp beaks","thin beaks","short beaks","huge beaks","enormous beaks","wide beaks","thin, sharp beaks","long, sharp beaks","long, pointy beaks","short, pointy beaks","huge, pointy beaks","huge, sharp beaks","short, sharp beaks","thin, pointy beaks"];
  data.names7b = [""];
  data.names8 = ["almost invisible","small","will hidden","small and pointy","small and stubby","hidden behind their feathers"];
  data.names9 = [""];
  data.names11 = ["It's covered in large feathers.","It's covered in large, thin feathers.","It's covered in large, wide feathers.","It's covered in long, thin feathers.","It's covered in long, wide feathers.","It's covered in short, thin feathers.","It's covered in short, wide feathers.","It's covered in small feathers.","It's covered in small, thin feathers.","It's covered in small, wide feathers."];
  data.names11a = "Их перья "
  return data
}

function generate () {
  var random1 = parseInt(Math.floor((Math.random() * 8)))
  var data = getMammal()
  if (random1 === 1) {
    data = getAquatic()
  }
  else if (random1 === 2) {
    data = getAmphibian()
  }
  else if(random1 === 3){
    data = getReptile()
  }
  else if(random1 === 4){
    data = getFish()
  }
  else if(random1 === 5){
    data = getInvertebrate()
  }
  else if(random1 === 6){
    data = getBird()
  }
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

  var random7a = parseInt(Math.floor((Math.random() * data.names7a.length)));
  var random7b = parseInt(Math.floor((Math.random() * data.names7b.length)));			
  var random8 = parseInt(Math.floor((Math.random() * data.names8.length)));
  var random9 = parseInt(Math.floor((Math.random() * data.names9.length)));
  var random10 = parseInt(Math.floor((Math.random() * names10.length)));
  var random11 = parseInt(Math.floor((Math.random() * data.names11.length)));
  var random12a = parseInt(Math.floor((Math.random() * names12a.length)));
  var random12b = parseInt(Math.floor((Math.random() * names12b.length)));
  while(random12b === random12a){
    random2b = parseInt(Math.floor((Math.random() * names12b.length)));
  }
  var random12c = parseInt(Math.floor((Math.random() * names12c.length)));
  while(random12c === random12a || random12c === random12b){
    random12c = parseInt(Math.floor((Math.random() * names12c.length)));
  }
  var random12d = parseInt(Math.floor((Math.random() * names12c.length)));
  while(random12d === random12a || random12d === random12b || random12d === random12c){
    random12d = parseInt(Math.floor((Math.random() * names12c.length)));
  }
  var random12e = parseInt(Math.floor((Math.random() * names12d.length)));
  while(random12e === random12a || random12e === random12b || random12e === random12c || random12e === random12d){
    random12e = parseInt(Math.floor((Math.random() * names12d.length)));
  }
  var random13 = parseInt(Math.floor((Math.random() * names13.length)));
  var random14a = parseInt(Math.floor((Math.random() * names14.length)));
  var random14b = parseInt(Math.floor((Math.random() * names14.length)));
  while(random14b === random14a){
    random14b = parseInt(Math.floor((Math.random() * names14.length)));
  }
  var random15 = parseInt(Math.floor((Math.random() * names15.length)));
			
  var name = 'Этот вид инопланетян - ' + data.title + '. '
  name += 'У них ' + random2a + random2b + random2c + '.\n'
	
  name += 'У них ' + random3 + " which sit " + random4 + " in their sockets and can often make them appear to be " + random5a + ". Their eyesight is " + random6a + ".\n"
			
  name += "Их " + data.names7a[random7a] + data.names7b[random7b] + " often make these aliens appear to be " + random5b + ", but looks can be deceiving.<br />"
  name += "Их уши " + data.names8[random8] + " and their hearing is " + random6b + ". " + data.names9[random9] + '\n'
			
  name += "Их кожа " + names10[random10] + " " + data.names11[random11] + "<br />"
  name += data.names11a + " в основном " + names12a[random12a] + names12b[random12b] + names12c[random12c] + names12c[random12d] + names12d[random12e] + ", which tend to become " + names13[random13] + " с возрастом.\n"
			
  name += "Их мужчины обычно " + names14[random14a] + " чем их женщины и their colors are " + names15[random15] + ". The females, however, are usually " + names14[random14b] + "."
		
  return name
}

module.exports = {
  generate
}
