const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// GET - /add-product
router.get('/add-product', productsController.getAddProduct);

// POST - /add-product
router.post('/add-product', productsController.postAddProduct);

module.exports = router;

