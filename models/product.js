const fs = require('fs');
const path = require('path');

const pathBuilt = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callbackFn) => {
  fs.readFile(pathBuilt, (err, fileContent) => {
    if (err) {
      return callbackFn([]);
    }
    callbackFn(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(_productId, _title, _description, _price, _imageUrl) {
    this.productId = _productId;
    this.title = _title;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  save() {
    this.productId = Math.round(Math.random() * 1000).toString();
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(pathBuilt, JSON.stringify(products), (err) => {
        console.log('err', err);
      });
    });
  }

  saveModifiedFile() {
    if (this.productId) {
      getProductsFromFile((products) => {
        const existingProdIndex = products.findIndex(
          (product) => product.productId === this.productId
        );
        const modifiedProducts = [...products];
        modifiedProducts[existingProdIndex] = this;

        fs.writeFile(pathBuilt, JSON.stringify(modifiedProducts), (err) => {
          console.log('err', err);
        });
      });
    }
  }

  static fetchAll(callbackFn) {
    getProductsFromFile(callbackFn);
  }

  static findProductById(pid, callbackFn) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.productId === pid);
      callbackFn(product);
    });
  }
};
