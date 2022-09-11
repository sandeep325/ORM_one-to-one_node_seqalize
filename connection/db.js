const config = require("./Config");
const mysql = require('mysql2');
const Sequelize = require('sequelize');
module.exports = db = {};

// create db if it does not exist 
const { host, port, user, password, database } = config.database;
const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  })

db.sequelize = sequelize ;
// init the Employee and Setting models and add them to the exported db object
const Employee = require('../Model/Employee.Model'); 
const Setting = require('../Model/Setting.Model');

// create one-to-one realtion b/w two tables.
// Employee.hasOne(Setting);  //for one-to-one
Employee.hasMany(Setting);  //for one-to-many
Setting.belongsTo(Employee);

db.Employee = Employee;
db.Setting = Setting;
// db.sequelize = sequelize;
sequelize.sync();  //For Sync all  modules with db 
//  sequelize.sync({force: true})  //harmfull for production 

