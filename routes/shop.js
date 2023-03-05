const path = require('path');

const express = require('express');

const viewPath = require('../utils/path');

const adminData = require('./admin');

const router = express.Router();

// Path + method
router.get('/', (req, res, next) => {
  console.log(adminData.products);
  res.render('shop', {
    prods: adminData.products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: adminData.products.length > 0,
    formCSS: true,
    productCSS: true,
    activeShop: true,
  });
});

module.exports = router;
