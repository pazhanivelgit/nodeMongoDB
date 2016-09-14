﻿var util = require('../public/util');
var project = require("../model/project");
var async = require('async');
var error_const = require('./error_constants.js');
var jwt = require('jsonwebtoken');
var logger = require("../public/logger");


//async.each

exports.getProjectById = function routeGetProjectById(req, res, next) {
    var proj_id = req.params.projectId;
    if (proj_id) {
        
        var id = parseInt(proj_id);
               
        project.find({ project_id: id }, util.exculdeFields, function (err, proj) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (proj.length > 0) {
                    //res.status(200).json(proj[0].project_detail);
                    res.status(200).json(proj[0]);
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

    var isValid = 0;
    var token = req.headers['x-access-token'];
    /*
    var validateuserToken = function(next){

            jwt.verify(token, util.secret.secretkey, function(err, decoded) {      
                  if (err) {
                    console.error("token expired",err);
                    //return res.json({ success: false, message: 'Failed to authenticate token.' }); 
                    err.name = "Invalid client"
                    next(err,[]);   
                  } else {
                    // if everything is good, save to request for use in other routes
                    //req.decoded = decoded;    
                    //next(null,);
                    //console.log("decoded is ",decoded);
                    next(null,isValid);
                  }
            });

    }; */

    var getsCustomerName = function(next){
       var nameCallback = function(err,result){
            if(err){
                console.error(err);
                next(err);
            }else{
                next(null,result);
            }

       };
       getCustomerName(req,nameCallback); 
    };
    
    async.waterfall([
        getsCustomerName,
        asyncGetAllProjects
       // function(projects) {
       //     res.status(200).json(projects);
        //}
    ], function (error, success) {
        if (error) {
            //alert('Something is wrong!');
            //res.status(500).json(util.showMessage('Internal Server Error'));
            res.status(500).json(util.showMessage(error.name));
        }else{
            res.status(200).json(success);
        }
    });


    
};

function getCustomerName(req,callback) {
    //return function (callback) {  //*change made
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
    //} // *change made
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
	
	var obj = { customer_id : customer.customer_id };
	
        project.find(obj, exculdeFields, function (err, projects) {
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
    var notification_list = req.body.notifications|| {};
    var proj_team = req.body.project_team||[];
    var cus_team = req.body.customer_team||[];
    var _goals = req.body.goals||{};
    var _status = req.body.status||{};
    var _boxLogs = req.body.box_logs || {};
    //it will be update during final setup
    //var _boxLogs = {
    //    'exec_only_group_id': '',
    //    'all_users_group_id': '',
    //    'exec_only_folder_id': '',
    //    'all_users_folder_id': ''
    //};
    
    if (p_details && notification_list) {
        var _project = new project({customer_id: cus_id,project_id: p_id, project_detail: p_details, notifications: notification_list, project_team: proj_team,customer_team:cus_team,goals:_goals,status:_status, box_logs: _boxLogs});
        //var _project = new project({customer_id: cus_id,project_id: p_id, project_detail: p_details, notifications: [], project_team: [],customer_team: [],goals:[],status: {} });        
        //change made
        var isProjectidExist = function(next){
            var isProject = 0;

            project.find({ project_id: p_id }, util.exculdeFields, function (err, proj) {
                if (err) {
                    res.status(400).json(util.showMessage('error:' + err.name));
                } else {
                    
                    if (proj.length > 0) {

                        isProject = 1;
                        next(null,isProject);
                    }
                    else {
                        next(null,isProject);
                    }
                }
            });


        };


        var insertProject = function(isProject,next){

            if(isProject === 0){

                _project.save(function(err, userObj) {
                    if (err) {
                        next(err,[]);
                    } else {
                        console.log("inserted");
                        next(err,userObj);
                    }
                });
            }else{
                var errObj = util.createError(error_const.PROJECTEXIST);
                next(errObj,null);
            }
        };

        var finalResult = function(err,result){
            if(err){
                res.status(400).json(err);
            }else{
                res.status(200).json(result);//try userObj and handle error
            }

        };

        async.waterfall([isProjectidExist,insertProject],finalResult);
    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}



exports.findProjectByUserID =  function routeProjectByUserID(req,res,next){

    var userId = req.params.userID;
    logger.log('info', 'API-Get project by user-', userId);
    
    //var proj_details = [];
    //var finalResultObj = {};
    
    //var checkInCustomerTeam = function(next){
        project.find({ $or: [{ "project_team.email_address": userId}, { "customer_team.email_address": userId}]}, util.exculdeFields, function(err, proj) {
        if (err) {
                logger.log('error', 'API-Get project by user-error', err.message);
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (proj.length > 0) {
                    //res.status(200).json(proj);
                    //proj_details = proj;
                    var count = proj.length;
                    
                    var resp = {};
                    resp.user_email_id = userId;
                    resp.total_count = proj.length;
                    resp.entries = [];
                for (var i = 0; i < proj.length; i++) {
                        var _proj = JSON.parse(JSON.stringify(proj[i].project_detail));
                        //var _proj = proj[i].project_detail;
                        _proj.customer_id = proj[i].customer_id;
                    resp.entries.push(_proj);
                }
                    logger.log('info', 'API-Get project by user-response-', JSON.stringify(resp));
                    res.status(200).json(resp);
                }
                else {
                    res.status(400).json(util.showMessage('No project found for the user!'));
                    //next(null,proj_details);
                }
            }
        }); 
   // };
   //async.waterfall([checkInCustomerTeam,gettingCustomerName],finalResult);
}


exports.updateProjectDetails = function updateProjectDetails(req,res,next){

    console.log("UpdateProjectDetails request receieved");
    var projectid = req.params.projectId;
    var projDetailsArray = req.body;
    var id = parseInt(projectid);
    var updatequery = {$set: { "project_detail": projDetailsArray }};
    var update_record = {
        "project_id" : id
    };

    
    project.update(update_record,updatequery,function(err,projstatus){
        if(err){
            console.error("error updating",err);
            res.status(500).json(err);

        }else{
            if(projstatus.n > 0){
                res.status(200).json(util.showMessage('Project details updated successfully'));
            }else{
                res.status(500).json(util.showMessage('No matching record found'));
            }
            
        }
    }); 
};


//update the entire project
exports.updateProject = function updateProject(req, res, next) {
    logger.log('info', 'Update project-Request-', JSON.stringify(req.body));
    if (req.body&& req.body.project_id) {
        var pid = req.body.project_id;
        var project = require("../model/project");
        project.findOneAndUpdate({ project_id: pid }, req.body, function (err, result) {
            if(err) {
            logger.log('error', 'updating into Mongo:' + err.message);
            res.status(500).json(util.showMessage(err.message));
            }else{
                
                if(result){
                    res.status(200).json(util.showMessage('Project updated successfully'));
                }else{
                    res.status(500).json(util.showMessage('No matching record found'));
                } 
            }
        });
    }
    else { 
        res.status(400).json(util.showMessage('Invalid request params!'));
    }
};

exports.deleteProjectById = function deleteProjectById(req, res, next) {
    var proj_id = req.params.projectId;
    var id = parseInt(proj_id);
    var customer = require("../model/customer");
    project.findOneAndRemove({ project_id: id }, function (err, status) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.name));
        } else {
            res.status(200).json(util.showMessage('The project is deleted!'));
            //if (status) {
            //    res.status(200).json(util.showMessage('The project is deleted!'));
            //} else {
            //    res.status(500).json(util.showMessage('No matching record found'));
            //}
        }
    });
};
