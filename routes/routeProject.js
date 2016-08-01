var util = require('../public/util');
var project = require("../model/project");

exports.getProjectById = function routeGetProjectById(req, res, next) {
    var proj_id = req.params.projectId;
    if (proj_id) {
        
        var id = parseInt(proj_id);
               
        project.find({ project_id: id }, util.exculdeFields, function (err, proj) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (proj.length > 0) {
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
    
    project.aggregate({
        $group: {
            _id: '$project_id'
        }
    }, function (err, projects) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.name));
        } else {
            res.status(200).json(projects);
        }
    }
);

    //project.find({}, util.exculdeFields, function (err, projects) {
    //    if (err) {
    //        res.status(400).json(util.showMessage('error:' + err.name));
    //    } else {
    //        res.status(200).json(projects);
    //    }
//});
    
}

exports.addProject=function routeProjectInsertRequest(req, res, next) {
    var p_id = req.body.project_id;
    var p_details = req.body.project_detail;
    var notification_list = req.body.notifications;
    
    if (p_details && notification_list) {
        var _project = new project({ project_id: p_id, project_detail: p_details, notifications: notification_list});
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

