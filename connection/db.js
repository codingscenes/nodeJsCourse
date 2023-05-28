const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://test2020:XM1ElzQcr9Ka9hPB@cluster0.cfo4b9s.mongodb.net/notes?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('Connected to DB!', client);
      const db = client.db();
      callback();
    })
    .catch((error) => {
      console.log('error in connecting database', error);
      throw error;
    });
};

module.exports = mongoConnect;
