﻿var util = require('../public/util');
var project = require("../model/project");
var async = require('async');


exports.getGoalsByProjID = function getGoalsByProjID(req, res, next) {
    async.waterfall([
        getCustomerName(req),
        asyncGetGoals,
        function (resp) {
            res.status(200).json(resp);
        }
    ], function (error, success) {
        if (error) {
            res.status(500).json(util.showMessage(error.name));
        }
    });
};

function getCustomerName(req, callback) {
    return function (callback) {
        
        var cus_id = req.params.customerId;
        if (cus_id) {
            
            var id = parseInt(cus_id);
            var customer = require("../model/customer");
            
            customer.find({ customer_id: id }, util.exculdeFields, function (err, customer) {
                if (err) {
                    callback(err, null);
                    //res.status(400).json(util.showMessage('error:' + err.name));
                } else {
                    
                    if (customer.length > 0) {
                        callback(null, req, customer[0]);
                    }
                    else {
                        callback({ name: 'No records found!' }, null);
                    }
                }
            });
        }
        else {
            callback({ name: 'Invalid params!' }, null);
        }
    }
}

function asyncGetGoals(req, customer, callback) {
    var proj_id = req.params.projectId;
    if (proj_id) {
        var id = parseInt(proj_id);
        var query = project.findOne({ 'project_id': id });
        query.select('-_id project_detail goals');
        query.exec(function (err, _goals) {
            if (err) {
                callback(err, null);
            } else {
                
                if (_goals) {
                    var resp = {};
                    resp.customer_name = customer.customer_name;
                    resp.customer_id = customer.customer_id;
                    resp.project_name = _goals.project_detail.project_name;
                    resp.project_id = _goals.project_detail.project_id;
                    resp.total_count = _goals.goals.length;
                    resp.entries = _goals.goals;
                    callback(null, resp);
                }
                else {
                    callback({ name: 'No records found!' }, null);
                }
            }
        });
    }
    else {
        callback({ name: 'Invalid params!' }, null);
    }
}

