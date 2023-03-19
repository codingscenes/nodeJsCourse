const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getShopIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductDetails);

router.get('/cart', shopController.getMyCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getMyOrders);

module.exports = router;
