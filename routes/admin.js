const path = require('path');

const express = require('express');

const viewPath = require('../utils/path');

const router = express.Router();

const products = [];

// GET - /add-product
router.get('/add-product', (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/add-product' });
});

// POST - /add-product
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect('/');
});

// module.exports = router;
module.exports = {
  routes: router,
  products: products,
};
