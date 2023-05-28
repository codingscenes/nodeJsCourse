const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://test2020:XM1ElzQcr9Ka9hPB@cluster0.cfo4b9s.mongodb.net/notestakingapp?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('Connected to DB!');
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log('error in connecting database', error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found/selected!';
};

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
