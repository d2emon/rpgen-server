var models = require('../index')

var nm1 = require('../../../data/dress-short.json')
var nm2 = require('../../../data/necklines.json')
var nm3 = require('../../../data/dress-reveal.json')

var nm4 = require('../../../data/dress-fabric-type.json')
var nm5 = require('../../../data/dress-stomach.json')
var nm6 = require('../../../data/dress-belt-type.json')
var nm7 = require('../../../data/dress-belt.json')
var nm8 = require('../../../data/dress-belt-position.json')

var nm9 = require('../../../data/dress-open.json')
var nm10 = require('../../../data/dress-front.json')
var nm11 = require('../../../data/dress-back.json')
var nm12 = require('../../../data/dress-end.json')

var nm13 = require('../../../data/dress-sleeves-length.json')
var nm14 = require('../../../data/dress-sleeves-width.json')
var nm15 = require('../../../data/dress-sleeves-divide.json')
var nm16 = ["меняют цвет и ",""];
var nm17 = require('../../../data/dress-sleeves-bands.json')
var nm18 = require('../../../data/dress-outline.json')

var nm19 = require('../../../data/jacket-sleeves-length.json')
var nm20 = require('../../../data/jacket-material.json')
var nm21 = require('../../../data/jacket-length.json')
var nm22 = require('../../../data/jacket-tie.json')
var nm23 = require('../../../data/jacket-tie-placement.json')
// var nm24 = " куртки "
var nm25 = require('../../../data/shirt-sleeves-width.json')
var nm26 = require('../../../data/shirt-sleeves-length.json')
var nm27 = require('../../../data/shirt-sleeves-decoration.json')
var nm28 = require('../../../data/jacket-neckline.json')
var nm29 = require('../../../data/shirt-types.json')
var nm30 = require('../../../data/shirt-belt-type.json')
var nm31 = require('../../../data/shirt-belt.json')
var nm32 = require('../../../data/shirt-belt-lock.json')
var nm33 = require('../../../data/shirt-belt-function.json')
var nm35 = ["leather","hide","furred","soft leather","hard leather","bound cloth"];
var nm36 = ["rare","very rare","fairly rare","fairly uncommon","very uncommon","pretty uncommon","pretty rare","pretty unusual","pretty unique"];
var nm37 = ["quite simple","a simple design","an ordinary design","a common design","a common type","not that special","a design found commonly","not any different from others"];
var nm38 = ["boots","shoes"];
var nm39 = ["leather","hide","fur","leather","leather","cloth"];

function generate (sex) {
  var nm24 = " куртки "
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
    name += rnd4 + ' ' + rnd5 + ' её платья покрывает живот, где непрерывный поток платья прерывается ' + rnd6 + ' ' + rnd7 + ', который она носит ' + rnd8 + ' на талии.'
    var name2 = "Под " + rnd7 + " платье " + rnd9 + " нижнее платье. "
    name2 += "Передний край верхнего платья " + rnd10 + ", а задний образует " + rnd11 + " шлейф и оканчивается " + rnd12 + "."
    var name3 = "Её рукава " + rnd13 + " и " + rnd14 + ", " + rnd15 + " они " + rnd16 + " отделаны " + rnd16b + ", " + rnd17 + " пояском из того же материала, что и отделка " + rnd18 + " платья." 

    var title = rnd + " платье"
  } else {
    var rnd19 = models.generateId(nm19)
    var rnd20 = models.generate(nm20)
    var rnd21 = models.generate(nm21)
    var rnd22 = models.generate(nm22)
    var rnd23 = models.generate(nm23)
    if(rnd19  > 2){
      nm24 = " рубахи "
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

    rnd31b = rnd31[0].toUpperCase() + rnd31.substring(1)
    rnd38 = rnd38[0].toUpperCase() + rnd38.substring(1)

    var name = "На нем " + rnd20 + " куртка с " + nm19[rnd19] + " рукавами, которая заканчивается " + rnd21 + " и " + rnd22 + " " + rnd23 + ". "
    name += "Рукава его" + nm24 + " " + rnd25 + " и " + rnd26 + ", они украшены " + rnd27 + "."
    var name2 = "У куртки " + rnd28 + " через который видна " + rnd29 + " рубаха, которую он носит под курткой. "
    name2 += "Вместе с рубахой он носит " + rnd30 + " " + rnd31 + ", скрепленный " + rnd32 + ". "
    name2 += rnd31b + " " + rnd33 + "."
    var name3 = "Его брюки простые и " + rnd34 + " и длиной до " + rnd35 + " " + rnd38 + ". "
    name3 += rnd38 + " сделаны из " + rnd36 + " " + rnd35 + ", но в остальном это " + rnd37 + "."

    var title = rnd20 + " куртка"
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
