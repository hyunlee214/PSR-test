'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.js'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Location = require('./location')(sequelize, Sequelize)
db.Room     = require('./room')(sequelize, Sequelize)
db.Pictures = require('./pictures')(sequelize, Sequelize)
db.Log      = require('./log')(sequelize, Sequelize)
db.LogType  = require('./logType')(sequelize, Sequelize)
db.Ad       = require('./ad')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
