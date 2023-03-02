const path = require('path');

const express = require('express');

const viewPath = require('../utils/path');

const adminData = require('./admin');

const router = express.Router();

// Path + method
router.get('/', (req, res, next) => {
  console.log(adminData.products);
  res.render('shop');
});

module.exports = router;
