const path = require('path');

const express = require('express');

const router = express.Router();

// GET - /add-product
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

// POST - /add-product
router.post('/add-product', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
