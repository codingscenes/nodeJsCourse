const Sequelize = require('sequelize').Sequelize;

// database, username, password, options

const sequelize = new Sequelize('nodejs-course', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  // logging: false,
});

module.exports = sequelize;
