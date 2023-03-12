const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.body);
  // products.push({ title: req.body.title });
  const product = new Product(req.body.title); //{title: value}
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      formCSS: true,
      productCSS: true,
      activeShop: true,
    });
  }); // [{title: value},,,,]
};
