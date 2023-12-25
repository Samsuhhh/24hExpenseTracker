// backend/config/database.js

// allows you to load db configuration env variables from .env file into config/index.js
const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "postgres",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    seedersPath: '../db/seeders'
  }
};