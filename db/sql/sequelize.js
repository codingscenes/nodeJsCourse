const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("nodejs-course", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  logging: false, //to hide the verbose
});

module.exports = sequelize;
