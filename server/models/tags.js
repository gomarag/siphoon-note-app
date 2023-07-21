const { DataTypes } = require('sequelize');
const sequelize = require('../models');

const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'tag',
    timestamps: false
  });

module.exports = Tag;