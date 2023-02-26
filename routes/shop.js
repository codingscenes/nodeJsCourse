const path = require('path');

const express = require('express');

const viewPath = require('../utils/path');

const router = express.Router();

// Path + method
router.get('/', (req, res, next) => {
  res.sendFile(viewPath('shop.html'));
});

module.exports = router;
