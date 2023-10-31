const express = require('express');
const router = express.Router();
const {
  nestedHandler,
} = require('../handlers/nested');

router.get('/', nestedHandler);

module.exports = router;
