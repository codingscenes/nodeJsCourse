const Sequelize = require('sequelize').Sequelize;

// database, username, password, options

const sequelize = new Sequelize('nodejs-course', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
