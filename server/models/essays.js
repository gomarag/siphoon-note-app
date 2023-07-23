const { DataTypes } = require('sequelize');
const sequelize = require('../models');

const Essay = sequelize.define('Essay', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
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
    is_deleted: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    is_public: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    }
  }, {
    tableName: 'essay',
    timestamps: false
  });

  module.exports = Essay;