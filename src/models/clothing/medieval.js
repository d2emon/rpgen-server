var models = require('../index')

var nm1 = require('../../../data/dress-short.json')
var nm2 = require('../../../data/necklines.json')
var nm3 = require('../../../data/dress-reveal.json')

var nm4 = require('../../../data/dress-fabric-type.json')
var nm5 = require('../../../data/dress-stomach.json')
var nm6 = require('../../../data/dress-belt-type.json')
var nm7 = require('../../../data/dress-belt.json')
var nm8 = require('../../../data/dress-belt-position.json')

var nm9 = ["opens up slightly and reveals","opens up to the right and reveals","opens up to the left and reveals","opens up and reveals","opens up wide and reveals","flows down and hides","opens up left and right and reveals","flows down wide and hides"];
var nm10 = ["is shorter at the front and curves outwards","is much shorter at the front and curves outwards","is shorter at the front and flows straight down","reaches the ground generously","easily reaches the ground in the front","is longer than the bottom dress and flows straight down","is longer than the bottom dress and curves outwards","makes it just to the ground to cover her feet"];
var nm11 = ["fair","large","good","short","decent","long","small"];
var nm12 = ["broad curve","narrow curve","narrow tip","broad tip","narrow rectangle","broad rectangle"];
var nm13 = ["very long","quite long","a little too long","purposely too long","incredibly long","the length of her arms","longer than her arms","slightly shorter than her arms","almost the length of her arms","fairly short","a little short"];
var nm14 = ["incredibly wide","very wide","quite wide","wide","a little wide","narrow","quite narrow","a little narrow","a comfortable fit","a loose fit"];
var nm15 = ["just below the shoulder","just below the elbow","just above the elbow","below the shoulder","below the elbow","above the elbow","well below the shoulder","well below the elbow","well above the elbow","at the elbow","at the shoulder"];
var nm16 = ["they change color and where ",""];
var nm17 = ["decorative","elegant","ornamental","cosmetic","embellishing","ornate","delicate","graceful","luxurious","simple","modest","refined","stylish"];
var nm18 = ["edges","sleeves","sleeves and bottom","bottom","neckline","bottom and neckline","sleeves, bottom and neckline","sleeves and neckline"];

var nm19 = ["long","very long","fairly long","short","very short","fairly short"];
var nm20 = ["leather","hide","furred","cloth","animal skin","silky","velvety"];
var nm21 = ["just below his waist","well below his waist","just below his groin","well below his groin","just below his knees","well below his knees","just above his waist","well above his waist","just above his groin","well above his groin","just above his knees","well above his knees","his waist","his knees","his groin"];
var nm22 = ["tightly tied with string","loosely tied with string","buttoned up completely","almost completely buttoned up","half buttoned up","barely tied with string","barely buttoned up","bound"];
var nm23 = ["at the center","at the left side","at the right side","at the top left side","at the top right side","at the bottom left side","at the bottom right side","slightly off-center"];
var nm24 = " jacket ";
var nm25 = ["incredibly wide","very wide","quite wide","wide","a little wide","narrow","quite narrow","a little narrow","a comfortable fit","a loose fit"];
var nm26 = ["his hands","just above his hands","well below his hands","below his hands","well above his hands","his wrists","just below his wrists","just above his wrists","well above his wrists","well below his wrists"];
var nm27 = ["a single thread lining from top to bottom","several thread linings from top to bottom","a single thread lining at the sleeve ends","several thread linings at the sleeve ends","a decorative band at the edges","a decorative band almost at the edges","a single thread lining and a decorative band"];
var nm28 = ["round neckline","wide, round neckline","narrow, round neckline","deep, round neckline","wide v-neck","narrow v-neck","deep v-neck","rectangular neckline","wide, rectangular neckline","narrow, rectangular neckline","deep, rectangular neckline"];
var nm29 = ["rough","elegant","fancy","graceful","luxurious","relatively simple","majestic","modest","noble","ornate","rather simple","refined","stylish","traditional"];
var nm30 = ["thin","thick","simple","small","big","light","dark","large","long","wide","small"];
var nm31 = ["leather belt","cloth belt","rope belt","cloth band"];
var nm32 = ["a big belt buckle","a simple knot","a small belt buckle","an intricate knot","an ornate pin","a decorative pin"];
var nm33 = ["purely decorative and a sign of wealth","mostly decorative and a sign of wealth","entirely decorative and a way to show off","solely decorative and a status symbol","mostly decorative, but does serve its purpose","partially decorative, but mostly a purposeful addition","slightly decorative, but mostly there to hang things from","almost entirely a functional addition","purely a functional addition","a functional addition, but does have some decorative value"];
var nm35 = ["leather","hide","furred","soft leather","hard leather","bound cloth"];
var nm36 = ["rare","very rare","fairly rare","fairly uncommon","very uncommon","pretty uncommon","pretty rare","pretty unusual","pretty unique"];
var nm37 = ["quite simple","a simple design","an ordinary design","a common design","a common type","not that special","a design found commonly","not any different from others"];
var nm38 = ["boots","shoes"];
var nm39 = ["leather","hide","fur","leather","leather","cloth"];

function generate (sex) {
  if (!sex) { sex = models.randomSex() }

  if (sex == 1) {
    var rnd = models.generate(nm1)
    var rnd2 = models.generate(nm2)
    var rnd3 = models.generate(nm3)
    var rnd1 = models.generate(nm1)
    while(rnd === rnd1) {
      rnd1 = models.generate(nm1)
    }

    var rnd4 = models.generate(nm4)
    var rnd5 = models.generate(nm5)
    var rnd6 = models.generate(nm6)
    var rnd7 = models.generate(nm7)
    var rnd8 = models.generate(nm8)

    var rnd9 = models.generate(nm9)
    var rnd10 = models.generate(nm10)
    var rnd11 = models.generate(nm11)
    var rnd12 = models.generate(nm12)
    var rnd13 = models.generate(nm13)
    var rnd14 = models.generate(nm14)
    var rnd15 = models.generate(nm15)
    var rnd16 = models.generate(nm16)
    var rnd16b = models.generate(nm6)
    var rnd17 = models.generate(nm17)
    var rnd18 = models.generate(nm18)

    rnd4 = rnd4[0].toUpperCase() + rnd4.substring(1)

    var name = 'Она одета в ' + rnd + ' платье с ' + rnd2 + ', который ' + rnd3 + ' открывает ' + rnd1 + ' нижнее платье. '
    name += rnd4 + ' ' + rnd5 + ' ее платья покрывает живот, где непрерывный поток платья прерывается ' + rnd6 + ' ' + rnd7 + ', который она носит ' + rnd8 + ' на талии.'
    var name2 = "Below the " + rnd7 + " the dress " + rnd9 + " the dress below. "
    name2 += "The front of the top dress " + rnd10 + ", the back continues to flow a " + rnd11 + " length behind her and ends in a " + rnd12 + "."
    var name3 = "Her sleeves are " + rnd13 + " and " + rnd14 + ", their flow is broken up " + rnd15 + " where " + rnd16 + "they're divided by " + rnd16b + ", " + rnd17 + " bands, these are the same fabric and color used to outline the " + rnd18 + " of the dress." 

    var title = rnd + " платье"
  } else {
    var rnd19 = models.generateId(nm19)
    var rnd20 = models.generate(nm20)
    var rnd21 = models.generate(nm21)
    var rnd22 = models.generate(nm22)
    var rnd23 = models.generate(nm23)
    if(rnd19  > 2){
      nm24 = " shirt "
    }
    var rnd25 = models.generate(nm25)
    var rnd26 = models.generate(nm26)
    var rnd27 = models.generate(nm27)
    var rnd28 = models.generate(nm28)
    var rnd29 = models.generate(nm29)
    var rnd30 = models.generate(nm30)
    var rnd31 = models.generate(nm31)
    var rnd32 = models.generate(nm32)
    var rnd33 = models.generate(nm33)
    var rnd34 = models.generate(nm25)
    var rnd35 = models.generate(nm35)
    var rnd36 = models.generate(nm36)
    var rnd37 = models.generate(nm37)
    var rnd38 = models.generate(nm38)

    var name = "His " + nm19[rnd19] + " sleeved, " + rnd20 + " jacket covers him to " + rnd21 + " and is " + rnd22 + " " + rnd23 + ". The sleeves of his" + nm24 + "are " + rnd25 + " and reach down to " + rnd26 + ", they're decorated with " + rnd27 + "."
    var name2 = "The jacket has a " + rnd28 + " which reveals part of the " + rnd29 + " shirt worn below it and is worn with a " + rnd30 + " " + rnd31 + ", which is held together by " + rnd32 + ". The " + rnd31 + " is " + rnd33 + "."
    var name3 = "His pants are simple and " + rnd34 + " and reach down to his " + rnd35 + " " + rnd38 + ". The " + rnd38 + " are made from a " + rnd36 + " " + rnd35 + ", but are otherwise " + rnd37 + ".";

    var title = rnd + " suit"
  }

  if (title) {
     title = title[0].toUpperCase() + title.substring(1)
  }

  var element = ''
  element += name + "\n"
  element += name2 + "\n"
  element += name3
  return {
    title: title,
    description: element
  }
}

module.exports = {
  generate
}
