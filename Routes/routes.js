const expres = require('express');
const multer = require("multer");
const EmployeeController = require("../Controller/Employee.Controller");
const SettingController  = require("../Controller/Setting.Controller");
const routes = expres.Router();
routes.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// ROUTING URL'S /  API'S URL HERE
routes.post('/add_emp',EmployeeController.AddEmp);
routes.post('/addEmp_setitngs',SettingController.insertEmployeeSettings);
routes.get('/emp_listing',EmployeeController.FindallEmp);
routes.get('/emp_detail/:id',EmployeeController.EmpByID);
routes.get('/settings_list',SettingController.TotalSetting);
routes.patch('/updateSetting',SettingController.updateSetting)
module.exports=routes; 

