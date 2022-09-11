const {Sequelize,DataTypes} = require("sequelize");
const Connector = require("../connection/db");
const  sequelize = Connector.sequelize;

const Setting = sequelize.define("Setting", {
    
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  
  },
 
 theme: {
   type: DataTypes.STRING,
   allowNull: false,
   validate : {
    notEmpty: true
 }
    
 },
autoLogin: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue:false,
   validate : {
    notEmpty: true
 }  
 }
     
});  
module.exports = Setting;
