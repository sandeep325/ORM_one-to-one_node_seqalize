const date = require('date-and-time');
const now = new Date();
const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const db = require('../connection/db');
const Setting = require('../Model/Setting.Model');
// get employee model form db
const Employee = db.Employee

// EMP CREATE 
exports.AddEmp = async (req, res, next) => {
    if (req?.body?.emp_name == '' || req?.body?.designation == '' || req?.body?.email == '') { return res.status(400).json({ status: 400, message: 'please provide complete data.' }); }
    const RawData = {
        'emp_name': req?.body?.emp_name,
        'designation': req?.body?.designation,
        'email': req?.body?.email,
    }
    await Employee.create(RawData).then((output) => {
        // console.log(output); return false;
        if (output._options.isNewRecord == true) {
            res.status(201).json({ status: 201, insertedId: output.id, message: 'New Emp added successfully.' });
        }
        else {
            res.status(400).json({ status: 400, message: 'Could not created please try again.' });
        }
    }).catch((err) => {
        if (err) { return res.status(500).json({ status: 500, error: err.errors, message: 'Failed to perform action into db.' }); }

    });
}


// EMP LISTING
exports.FindallEmp = async (req, res, next) => {
    await Employee.findAll({
        attributes: ['id', 'emp_name','designation', 'email','createdAt'],
        include: [
            {
                model: Setting,
                attributes: ['theme', 'autoLogin'],
            },
        ]
    }).then((result) => {
        if (result?.length > 0) {
            console.log(result);
            var Rows = result?.map(data => {
                return {
                    'id': data?.id,
                    'emp_name': data?.emp_name,
                    'designation': data?.designation,
                    'email': data?.email,
                    'Setting': data?.Settings,  //for one to many
                    // 'Setting': data?.Setting,  //for one to one
                    'createdAt': (data?.createdAt) ? date.format(data?.createdAt, 'YYYY/MM/DD HH:mm:ss') : 'NA'
                }
            });
            res.status(200).json({
                status: 200,
                count: result?.length,
                data: Rows,
                message: 'All Emp list.'
            });

        } else {
            res.status(200).json({
                status: 200,
                count: 0,
                data: [],
                message: 'No Record found.'
            });
        }

    }).catch((err) => {
        if (err) { return res.status(500).json({ status: 500, error: err.errors, message: 'Failed to perform action into db.' }); }

    });

}

// EMP FIND BY ID 
exports.EmpByID = async (req, res, next) => {
    if (req?.params?.id == '' || req?.params?.id == undefined || req?.params?.id == null) { return res.status(400).json({ status: 400, message: 'please provide emp valid id.' }); }
    await Employee.findOne({ where: { id: req?.params?.id } }).then((result) => {
        if (result) { 
                let row = {
                    id: result?.id,
                    emp_name: result?.emp_name,
                    designation: result?.designation,
                    email: result?.email,
                    Setting: result?.Setting,
                    createdAt: (result?.createdAt) ? date.format(result?.createdAt, 'YYYY/MM/DD HH:mm:ss') : 'NA'
                }
            // console.log(row);
            res.status(200).json({
                status: 200,
                count:1,
                data:row,
                message:`${result?.emp_name} detial.`
            });

        } else {
            res.status(200).json({
                status: 200,
                count: 0,
                data: [],
                message: 'No Recor found.'
            });

        }
    }).catch((err) => {
        if (err) { return res.status(500).json({ status: 500, error: err.errors, message: 'Failed to perform action into db.' }); }
    });

}