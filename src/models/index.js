function generateId (data) {
  return Math.floor(Math.random() * data.length)
}

function generate (data) {
  return data[generateId(data)]
}

function randomSex () {
  // if (sex) { return sex }
  return generate([1, 2])
}

module.exports = {
  generate,
  generateId,
  randomSex
}
