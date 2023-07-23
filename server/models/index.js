'use strict';
require('dotenv').config();
const logger = require('../middlewares/logger');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV;
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
  }
);
logger.debug(sequelize.config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./users')(sequelize, Sequelize);
db.Essay = require('./essays')(sequelize, Sequelize);
db.Tag = require('./tags')(sequelize, Sequelize);

module.exports = db;
