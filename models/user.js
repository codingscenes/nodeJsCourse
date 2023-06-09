const mongodb = require('mongodb');
const getDb = require('../connection/db').getDb;
const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    // findOne will not give cursor, but immediately returns that one element
    return db.collection('myusers').findOne({
      _id: new ObjectId(userId),
    });
  }
}

module.exports = User;
