const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Shop Product List',
      path: '/product-list',
    });
  });
};

exports.getShopIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/',
    });
  });
};

exports.getMyCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'My Cart',
    path: '/cart',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'My Checkout',
    path: '/checkout',
  });
};

exports.getMyOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'My Orders',
    path: '/orders',
  });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  // filter the data using the product id and send that product to view
  Product.findProductById(productId, (product) => {
    res.render('shop/product-details', {
      pageTitle: 'My Product Details',
      path: '/product-details',
      product: product,
    });
  });
};
