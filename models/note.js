const { DataTypes } = require('sequelize');
const sequelize = require('../connection/database');

const Note = sequelize.define('note', {
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

module.exports = Note;
