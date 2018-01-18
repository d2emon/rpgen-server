var express = require('express')
var router = express.Router()
var worlds = require('../models/worlds')
var names = require('../models/names/medieval')
var clothing = require('../models/clothing/medieval')

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' })
})

router.get('/worlds', function (req, res) {
  var random = req.query.random
  if (!random) {
    res.send({
      'worlds': worlds.worlds
    })
  }

  var count = req.query.count
  if (!count) { count = 1 }

  var generated = []
  for (var i=0; i < count; i++) {
    generated.push(worlds.generate())
  }

  res.send({
    'worlds': generated
  })
})

router.get('/names', function (req, res) {
  var count = req.query.count
  if (!count) { count = 1 }

  var sex = req.query.sex

  var generated = []
  for (var i=0; i < count; i++) {
    generated.push(names.generate(sex))
  }

  res.send({
    'names': generated
  })
})

router.get('/clothing', function (req, res) {
  var count = req.query.count
  if (!count) { count = 1 }

  var sex = req.query.sex

  var generated = []
  for (var i=0; i < count; i++) {
    generated.push(clothing.generate(sex))
  }

  res.send({
    'count': count,
    'sex': sex,
    'clothing': generated
  })
})

router.get('/characters', function (req, res) {
  var count = req.query.count
  if (!count) { count = 1 }

  var sex = req.query.sex

  var generated = []
  for (var i=0; i < count; i++) {
    generated.push({
      'count': count,
      'sex': sex,
      'name': names.generate(sex),
      'clothing': clothing.generate(sex),
    })
  }

  res.send({
    'characters': generated
  })
})

module.exports = router
