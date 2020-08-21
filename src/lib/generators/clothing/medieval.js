var models = require('../generators')

var nm1 = require('../../../../data/dress-short.json')
var nm2 = require('../../../../data/necklines.json')
var nm3 = require('../../../../data/dress-reveal.json')

var nm4 = require('../../../../data/dress-fabric-type.json')
var nm5 = require('../../../../data/dress-stomach.json')
var nm6 = require('../../../../data/dress-belt-type.json')
var nm7 = require('../../../../data/dress-belt.json')
var nm8 = require('../../../../data/dress-belt-position.json')

var nm9 = require('../../../../data/dress-open.json')
var nm10 = require('../../../../data/dress-front.json')
var nm11 = require('../../../../data/dress-back.json')
var nm12 = require('../../../../data/dress-end.json')

var nm13 = require('../../../../data/dress-sleeves-length.json')
var nm14 = require('../../../../data/dress-sleeves-width.json')
var nm15 = require('../../../../data/dress-sleeves-divide.json')
var nm16 = ["меняют цвет и ",""];
var nm17 = require('../../../../data/dress-sleeves-bands.json')
var nm18 = require('../../../../data/dress-outline.json')

var nm19 = require('../../../../data/jacket-sleeves-length.json')
var nm20 = require('../../../../data/jacket-material.json')
var nm21 = require('../../../../data/jacket-length.json')
var nm22 = require('../../../../data/jacket-tie.json')
var nm23 = require('../../../../data/jacket-tie-placement.json')
// var nm24 = " куртки "
var nm25 = require('../../../../data/shirt-sleeves-width.json')
var nm26 = require('../../../../data/shirt-sleeves-length.json')
var nm27 = require('../../../../data/shirt-sleeves-decoration.json')
var nm28 = require('../../../../data/jacket-neckline.json')
var nm29 = require('../../../../data/shirt-types.json')
var nm30 = require('../../../../data/shirt-belt-type.json')
var nm31 = require('../../../../data/shirt-belt.json')
var nm32 = require('../../../../data/shirt-belt-lock.json')
var nm33 = require('../../../../data/shirt-belt-function.json')
var nm35 = require('../../../../data/pants-type.json')
var nm36 = require('../../../../data/shoes-rarity.json')
var nm37 = require('../../../../data/shoes-description.json')
var nm38 = require('../../../../data/shoes.json')
// var nm39 = ["leather","hide","fur","leather","leather","cloth"];

function lowercase(title) {
  if (! title) {
    return ''
  }
  return title[0].toLowerCase() + title.substring(1)
}

function uppercase(title) {
  if (! title) {
    return ''
  }
  return title[0].toUpperCase() + title.substring(1)
}

function generateDress() {
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

  var description = 'Она одета в ' + rnd + ' платье с ' + rnd2 + ', который ' + rnd3 + ' открывает ' + rnd1 + ' нижнее платье. '
  description += rnd4 + ' ' + rnd5 + ' её платья покрывает живот, где непрерывный поток платья прерывается ' + rnd6 + ' ' + rnd7 + ', который она носит ' + rnd8 + ' на талии.'
  description += "\n"
  description += "Под " + rnd7 + " платье " + rnd9 + " нижнее платье. "
  description += "Передний край верхнего платья " + rnd10 + ", а задний образует " + rnd11 + " шлейф и оканчивается " + rnd12 + "."
  description += "\n"
  description += "Её рукава " + rnd13 + " и " + rnd14 + ", " + rnd15 + " они " + rnd16 + " отделаны " + rnd16b + ", " + rnd17 + " пояском из того же материала, что и отделка " + rnd18 + " платья." 

  var title = rnd + " платье"
  if (title) {
    title = title[0].toUpperCase() + title.substring(1)
  }

  return {
    title: title,
    description: description
  }
}

function generateJacket() {
  var hasSleeves = true
  var rnd19 = models.generateId(nm19)
  var rnd20 = models.generate(nm20)
  var rnd21 = models.generate(nm21)
  var rnd22 = models.generate(nm22)
  var rnd23 = models.generate(nm23)
  if(rnd19  > 2){
    hasSleeves = false
  }
  var rnd25 = models.generate(nm25)
  var rnd26 = models.generate(nm26)
  var rnd27 = models.generate(nm27)
  var rnd28 = models.generate(nm28)

  var title = uppercase(rnd20) + " куртка"
  var description = "На нем " + lowercase(title) + " с " + nm19[rnd19] + " рукавами, которая заканчивается " + rnd21 + " и " + rnd22 + " " + rnd23 + ". "
  if (hasSleeves) {
    description += "Рукава его куртки " + rnd25 + " и " + rnd26 + ", они украшены " + rnd27 + "."
  }

  return {
    title: title,
    description: description,
    hasSleeves: hasSleeves,
    neckline: rnd28
  }
}

function generateShirt() {
  var rnd25 = models.generate(nm25)
  var rnd26 = models.generate(nm26)
  var rnd27 = models.generate(nm27)
  var rnd28 = models.generate(nm28)
  var rnd29 = models.generate(nm29)
  var rnd30 = models.generate(nm30)
  var rnd31 = models.generate(nm31)
  var rnd32 = models.generate(nm32)
  var rnd33 = models.generate(nm33)

  var title = uppercase(rnd29) + " рубаха"
  var description = "У него " + lowercase(title) + ". "
  description += "Вместе с рубахой он носит " + rnd30 + " " + rnd31 + ", скрепленный " + rnd32 + ". "
  description += uppercase(rnd31) + " " + rnd33 + "."
  var sleeves = "Рукава его рубахи " + rnd25 + " и " + rnd26 + ", они украшены " + rnd27 + "."

  return {
    title: title,
    description: description,
    sleeves: sleeves
  }
}

function generatePants() {
  var rnd34 = models.generate(nm25)

  var description = "Простые и " + rnd34 + " брюки"

  return {
    title: description,
    description: description
  }
}

function generateShoes() {
  var rnd35 = models.generate(nm35)
  var rnd36 = models.generate(nm36)
  var rnd37 = models.generate(nm37)
  var rnd38 = models.generate(nm38)

  var shoes = rnd38[0].toUpperCase() + rnd38.substring(1)
  var description = shoes + " сделаны из " + rnd36 + " " + rnd35 + ", но в остальном они " + rnd37 + "."

  return {
    title: shoes + " из " + rnd35,
    description: description
  }
}

function generate (sex) {
  var description = ''
  var clothings = []
  if (!sex) { sex = models.randomSex() }

  if (sex == 1) {
    var dress = generateDress()
    description = dress.description
    clothings.push(dress)
  } else {
    var jacket = null
    var shirt = null
    var pants = null
    var shoes = null

    if (models.generate([0, 1])) jacket = generateJacket()
    if (models.generate([0, 1])) shirt = generateShirt()
    if (models.generate([0, 1])) pants = generatePants()
    if (models.generate([0, 1])) shoes = generateShoes()

    if (jacket) {
      description += jacket.description
      if (!jacket.hasSleeves) {
        if (shirt) {
          description += shirt.sleeves
        }
      }
      description += "\n"

      description += "У куртки " + jacket.neckline
      if (shirt) {
        description += " через который видна " + lowercase(shirt.title)
      }
      description += "."
    }

    if (shirt) {
      if (jacket) {
        description += " Под курткой у него " + lowercase(shirt.description)
      } else {
        description += shirt.description
      }
    }

    if (description) {
      description += "\n"
    }

    if (pants) {
      description += "На нем " + lowercase(pants.title)
      if (shoes) {
        description += " и " + lowercase(shoes.title) + ". "
      } else {
        description += "."
      }
    }

    if (shoes) {
      description += shoes.description
    }

    if (jacket) clothings.push(jacket)
    if (shirt) clothings.push(shirt)
    if (pants) clothings.push(pants)
    if (shoes) clothings.push(shoes)
  }

  return {
    description: description,
    items: clothings
  }
}

module.exports = {
  generate
}
