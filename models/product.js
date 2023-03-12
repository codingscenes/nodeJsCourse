const products = [];

module.exports = class Product {

    constructor(incomingTitle) {
        this.title = incomingTitle;
    }

    save() {
        products.push(this); // {title: 'xxxxxx'}
    }

   static fetchAll() {
       return products;
    }
}
