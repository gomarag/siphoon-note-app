const { DataTypes } = require('sequelize');
const sequelize = require('../models');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  birthday: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  profile_image: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;