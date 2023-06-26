var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _essays = require("./essays");
var _tags = require("./tags");
var _users = require("./users");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var essays = _essays(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  essays.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(essays, { as: "essays", foreignKey: "user_id"});

  return {
    SequelizeMeta,
    essays,
    tags,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
