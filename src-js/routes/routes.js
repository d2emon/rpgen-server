const express = require('express');
const router = express.Router();
const {
  routesHandler,
} = require('../handlers/routes');

router.get('/', routesHandler);

module.exports = router;
