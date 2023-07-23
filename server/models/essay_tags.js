const { DataTypes } = require('sequelize');
const sequelize = require('../models');

const EssayTag = sequelize.define('EssayTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    essay_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'essay_tag',
    timestamps: false
  });

module.exports = EssayTag;