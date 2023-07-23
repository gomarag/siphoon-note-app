const { DataTypes } = require('sequelize');
const sequelize = require('../models');

const EssayTag = sequelize.define('EssayTag', {
    essay_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'essay_tag',
    timestamps: false
  });

module.exports = EssayTag;