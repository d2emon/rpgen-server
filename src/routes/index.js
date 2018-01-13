var express = require('express')
var router = express.Router()
var worlds = require('../models/worlds')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' })
})

router.get('/worlds', function (req, res) {
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

module.exports = router
