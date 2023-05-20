const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://codingscenes:HBsYWcIIxHwolORm@cluster0.ll9acxl.mongodb.net/notes?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      // can over write with
      // _db = client.db('posts');
      // will connect to 'posts' database (earlier connected with notes)
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
/**
 * mongodb behind the scenes will even manage this very elegantly with something called connection pooling where mongodb will make sure it provides sufficient connections for multiple simultaneous interactions with the database, so this is really a good pattern we should follow.
 * 
 * In the context of MongoDB, pooling refers to the process of managing a pool of connections to the database server. When an application connects to a MongoDB server, it establishes a connection that it can use to send queries and receive responses.

Connection pooling allows the application to reuse existing connections rather than opening a new connection each time it needs to perform a database operation. This can significantly reduce the overhead associated with establishing new connections and can improve the overall performance of the application.

The pooling mechanism works by maintaining a pool of open connections that the application can use as needed. When the application requests a connection, the pool manager checks to see if there is an available connection in the pool. If there is, the manager returns the existing connection to the application. If not, the manager creates a new connection and adds it to the pool.

The size of the connection pool can be configured to match the needs of the application. Setting the pool size too small can lead to contention for connections and increased overhead, while setting the pool size too large can consume unnecessary system resources. Finding the optimal pool size depends on the specific needs of the application and the available resources.
 */

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
