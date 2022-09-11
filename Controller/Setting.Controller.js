const date = require('date-and-time');
const now = new Date();
const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const db = require('../connection/db');
const Employee = require('../Model/Employee.Model');
// get employee model form db
const Setting = db.Setting;

exports.insertEmployeeSettings = async (req, res, next) => {
    // console.log(req.body.theme); return false;
    if (req?.body?.theme == '' || req?.body?.EmployeeId == '') { return res.status(400).json({ status: 400, message: 'please provide complete data.' }); }
    const RawData = {
        'theme': req?.body?.theme,
        'autoLogin': req?.body?.autoLogin,
        'EmployeeId': req?.body?.EmployeeId,
    }
    await Setting.create(RawData).then((result) => {
        if (result._options.isNewRecord == true) {
            res.status(201).json({ status: 201, insertedId: result.id, message: 'Theme setting set successfully.' });
        }
        else {
            res.status(400).json({ status: 400, message: 'Could not inserted please try again.' });
        }

    }).catch((err) => {
        if (err) { return res.status(500).json({ status: 500, error: err, message: 'Failed to perform action into db.' }); }
    });

}

exports.TotalSetting = async (req, res, next) => {
    await Setting.findAll().then((result) => {
        console.log(result);
        if (result?.length > 0) {
            let rows = result.map(data => {
                return {
                    id: data?.id,
                    theme: data?.theme,
                    autoLogin: data?.autoLogin,
                }
            });
            res.status(200).json({
                status: 200,
                count: result?.length,
                data: rows,
                message: `Avilable settings list .`,
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
        if (err) { return res.status(500).json({ status: 500, error: err, message: 'Failed to perform action into db.' }); }
    });

}

exports.updateSetting = async (req, res, next) => {
    if (req?.body?.id == '' || req?.body?.id == undefined || req?.body?.id == null) { return res.status(400).json({ status: 400, message: 'please provide emp valid id.' }); }
    let row = {
        'theme': req?.body?.theme,
        'autoLogin': req?.body?.autoLogin,
        'EmployeeId': req?.body?.EmployeeId,
    }
    await Setting.update(row, { where: { id: req?.body?.id } }).then((result) => {
        if (result > 0) {
            res.status(200).json({
                status: 200,
                updatedId: req?.body?.id,
                message: 'setting updated successfully.'
            });
        } else {
            res.status(200).json({
                status: 200,
                message: 'Could not updated please try again.'
            });
        }
    }).catch((err) => {
        if (err) { return res.status(500).json({ status: 500, error: err, message: 'Failed to perform action into db.' }); }
    });
}