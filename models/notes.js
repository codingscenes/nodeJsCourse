const { DataTypes } = require('sequelize');
const sequelize = require('../connection/database');

const Notes = sequelize.define('notes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Notes;
