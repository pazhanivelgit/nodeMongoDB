var util = require('../public/util');
var project = require("../model/project");
var async = require('async');


exports.getProjectById = function routeGetProjectById(req, res, next) {
    var proj_id = req.params.projectId;
    if (proj_id) {
        
        var id = parseInt(proj_id);
               
        project.find({ project_id: id }, util.exculdeFields, function (err, proj) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (proj.length > 0) {
                    res.status(200).json(proj[0].project_detail);
                }
                else {
                    res.status(400).json(util.showMessage('No records found!'));
                }
            }
        });
    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}


exports.getNotificationsByProjId = function routeGetNotificationsByProjId(req, res, next) {
    var proj_id = req.params.projectId;
    if (proj_id) {
        var id = parseInt(proj_id);
        var query = project.findOne({ 'project_id': id });
        query.select('-_id notifications');
        query.exec(function (err, notification) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (notification) {
                    res.status(200).json(notification);
                }
                else {
                    res.status(400).json(util.showMessage('No records found!'));
                }
            }
        });
    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}



exports.getAllProjects = function routeGetAllProjects(req, res, next) {
    
    //    project.aggregate({
    //        $group: {
    //            project_id: '$project_id',
    //            notifications:'$notifications'
    //        }
    //    }, function (err, projects) {
    //        if (err) {
    //            res.status(400).json(util.showMessage('error:' + err.name));
    //        } else {
    //            res.status(200).json(projects);
    //        }
    //    }
    //);
    
    //project.find({}, util.exculdeFields, function (err, projects) {
    //    if (err) {
    //        res.status(400).json(util.showMessage('error:' + err.name));
    //    } else {
    
    //        //var resp = {};
    //        //resp.
    //        res.status(200).json(projects);
    //    }
    //});
    
    async.waterfall([
        getCustomerName(req),
        asyncGetAllProjects,
        function(projects) {
            res.status(200).json(projects);
        }
    ], function (error, success) {
        if (error) {
            //alert('Something is wrong!');
            //res.status(500).json(util.showMessage('Internal Server Error'));
            res.status(500).json(util.showMessage(error.name));
        }
    });


    
};

function getCustomerName(req,callback) {
    
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
                        callback(null,customer[0]);
                    }
                    else {
                        //callback('No records found!', null);
                        callback({name:'No records found!'}, null);
                        //res.status(400).json(util.showMessage('No records found!'));
                    }
                }
            });
        }
        else {
            callback({ name: 'Invalid params!'}, null);
            //res.status(400).json(util.showMessage('Invalid params!'));
        }
    } 
}

function asyncGetAllProjects(customer, callback) {
    var exculdeFields = {
        __v: false,
        _id: false,
        customer_id:false,
        project_id:false,
        notifications:false,
        project_team: false,
        customer_team: false,
        goals: false
    };
        project.find({}, exculdeFields, function (err, projects) {
        if (err) {
            callback(err, null);
                //res.status(400).json(util.showMessage('error:' + err.name));
        } else {
            
            if(Array.isArray(projects) && projects.length > 0) {
                var resp = {};
                resp.customer_name = customer.customer_name;
                resp.customer_id = customer.customer_id;
                resp.total_count = projects.length;
                resp.entries = [];
                projects.forEach(function(item) { 
                    resp.entries.push(item.project_detail);
                });

                //resp.entries = projects;
                //res.status(200).json(projects);
                callback(null, resp);
            }
            else { 
                callback({name:'No records found!'}, null);
            }
        }
        });
}

exports.addProject=function routeProjectInsertRequest(req, res, next) {
    
    var cus_id = req.params.customerId;
    //var cus_name = req.body.customer_name;
    var p_id = req.body.project_detail.project_id;
    var p_details = req.body.project_detail;
    var notification_list = req.body.notifications;
    var proj_team = req.body.project_team;
    var cus_team = req.body.customer_team;
    var _goals = req.body.goals;
    var _status = req.body.status;
    
    if (p_details && notification_list) {
        var _project = new project({customer_id: cus_id,project_id: p_id, project_detail: p_details, notifications: notification_list, project_team: proj_team,customer_team:cus_team,goals:_goals,status:_status});
        _project.save(function(err, userObj) {
            if (err) {
                //console.log(err);
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                //console.log('saved successfully:', userObj);
                //res.status(200).json(util.showMessage('saved successfully!'));
                res.status(200).json(userObj);
            }
        });
    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}

