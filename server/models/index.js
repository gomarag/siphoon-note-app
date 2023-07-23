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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./users')(sequelize, Sequelize);
db.Essay = require('./essays')(sequelize, Sequelize);
db.Tag = require('./tags')(sequelize, Sequelize);
db.EssayTag = require('./essay_tags')(sequelize, Sequelize);

User.hasMany(Essay, { foreignKey: 'user_id' });
Essay.belongsTo(User, { foreignKey: 'user_id' });
Essay.belongsToMany(Tag, { through: EssayTag, foreignKey: 'essay_id' });
Tag.belongsToMany(Essay, { through: EssayTag, foreignKey: 'tag_id' });

module.exports = { User, Essay, Tag, EssayTag };

// module.exports = db;
