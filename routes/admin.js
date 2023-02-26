const express = require('express');

const router = express.Router();

// GET - /add-product
router.get('/add-product', (req, res, next) => {
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="title"/><button type="submit">Send</button></form>'
  );
});

// POST - /add-product
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
