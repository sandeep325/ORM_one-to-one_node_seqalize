const {Sequelize,DataTypes} = require("sequelize");
const Connector = require("../connection/db");
const  sequelize = Connector.sequelize;
const Employee = sequelize.define("Employee",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    emp_name:{
        type:DataTypes.STRING(255),
        allowNull:false,
        validate : {
            notEmpty: true
         }
    },
    designation:{
        type:DataTypes.STRING(100),
        allowNull:false,
        validate : {
            notEmpty: true
         }

    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique: true,
        validate : {
            notEmpty: true
         }
    },
});
module.exports = Employee;


