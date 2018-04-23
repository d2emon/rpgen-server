var names11 = ["It's covered in thick fur.","It's covered lightly in small hairs.","It's covered lightly in long, coarse hairs.","It's covered in thick, course fur.","It's covered long, wavy hairs.","It's covered short hairs.","It's covered short, curly hairs.","It's covered in nothing but a few hairs on their hands.","It's covered in nothing but hair on their heads, arms and legs.","It's covered in nothing, except for hair on their heads.","It's covered in nothing, except for hairs on their heads, chests, arms and legs.","It's covered in nothing but a few hairs on their heads.","It's covered lightly in tiny hairs.","It's covered in thick, short hairs.","It's covered in soft, short hairs."];

function randEl (elements) {
  if (!elements) {
    return null
  }

  id = parseInt(Math.floor((Math.random() * elements.length)))
  return elements[id]
}

function num2str (num) {
  if (num == 2) {
    return 'пара'
  } else if (num == 4) {
    return 'две пары'
  } else if (num == 6) {
    return 'три пары'
  }
}

function getAlien () {
  return {
    title: '',
    arms: require('../../../data/alien/default-arms.json'),
    legs: require('../../../data/alien/default-legs.json'),
    tails: require('../../../data/alien/default-tails.json'),

    names2a: require('../../../data/alien-mammal-parts-1.json'),
    names2b: require('../../../data/alien-mammal-parts-2.json'),
    names2c: require('../../../data/alien-mammal-parts-3.json'),
    names7a: require('../../../data/alien-mammal-mouths.json'),
    names7b: require('../../../data/alien-mammal-noses.json'),
    names8: require('../../../data/alien-mammal-ears.json'),
    names9: require('../../../data/alien-mammal-horns.json'),
    names11: names11,
    names11a: "Их кожа ",

    generate: function () {
      return {
        alienType: this.title,

        arms: randEl(this.arms),
        legs: randEl(this.legs),
        tail: randEl(this.tails),

        describe: function () {
          var name = 'Этот вид инопланетян - ' + this.alienType + '. '
          name += 'У них '
          if (this.arms) {
            name += num2str(this.arms.arms) + ' рук и '
          }
          if (this.legs) {
            name += num2str(this.legs) + ' ног '
          }
          name += this.tail.description + '.\n'

          return name
        }
      }
    }
  }
}

module.exports = getAlien
