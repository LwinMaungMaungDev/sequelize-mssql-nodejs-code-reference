const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Tables
const student = require('../models/student');
///////////////////////////////////////////////////////////

dotenv.config({ path: './config.env' });

const env = process.env;

const sequelize = new Sequelize(env.DATABASE, env.USER, env.PASSWORD, {
  host: env.HOST,
  port: env.PORT,
  dialect: 'mssql',
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    options: {
      encrypt: false,
    },
    useUTC: false,
  },
  timezone: '+06:30',
});

const db = {};

db.sequelize = sequelize;

db.student = sequelize.define('student', student);

module.exports = db;
