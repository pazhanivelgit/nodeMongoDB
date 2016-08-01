'use strict';

var router = require('express').Router();
var basePath = '/pw/v1';



function routeProjectsRequest(req, res, next) {
    return res.status(200).json({
        "projects": [  
            {
                "project_details": {
                    "project_name": "National Center for Civil and Human Rights",
                    "project_id": 23987429,
                    "date": "10/2/15",
                    "overall_status": "on Track"
                },
                "project_status": {
                    "overall_status": "not statrted",
                    "phase_name": "Design",
                    "Phase_order": "1",
                    "Phase_status": "Incomplete"
                }
            },
            {
                "project_details": {
                    "project_name": "National Center for Civil and Human Rights",
                    "project_id": 23987426,
                    "date": "10/2/15",
                    "overall_status": "on Track"
                },
                "project_status": {
                    "overall_status": "not statrted",
                    "phase_name": "Design",
                    "Phase_order": "1",
                    "Phase_status": "Incomplete"
                }
            },
            {
                "project_details": {
                    "project_name": "National Center for Civil and Human Rights",
                    "project_id": 23987427,
                    "date": "10/2/15",
                    "overall_status": "on Track"
                },
                "project_status": {
                    "overall_status": "not statrted",
                    "phase_name": "Design",
                    "Phase_order": "1",
                    "Phase_status": "Incomplete"
                }
            }
        ]
    }
    );
}


function routeProjectDetailsRequest(req, res, next) {
    return res.status(200).json({
        "project_details": {
            "project_name": "National Center for Civil and Human Rights",
            "project_id": "33298479",
            "project_location": "123 BeachTree GA 2333",
            "hero_image": "http://blogs.intel.com/iot/files/2015/01/SmartBuilding.jpg",
            "project_description": "pdetails"
        }
    }
);
}

function routeProjectStatusRequest(req, res, next) {
    return res.status(200).json({
        "project_status": {
            "overall_status": "not statrted",
            "phase_name": "Design",
            "Phase_order": "1",
            "Phase_status": "Incomplete"

        }
    }
    );
}

function routeProjectGoalsRequest(req, res, next) {
    return res.status(200).json({
        "goals": [  
            {
                "goal_name": "Meet deadline",
                "text": "some text",
                "date": "25/07/2016",
                "icon_type": "exlamation"
            },
            {
                "goal_name": "g1",
                "text": "",
                "date": "",
                "icon_type": ""
            },
            {
                "goal_name": "g1",
                "text": "",
                "date": "",
                "icon_type": ""
            }
        ]
    });
}

function routeProjectNotificationsRequest(req, res, next) {
    return res.status(200).json({
        "notifications": [  
            {
                "headlines": "remind deadline",
                "date": "25/07/2016",
                "link": "url",
                "text": "some text",
                "icon_type": "exclamation"
            },
            {
                "headlines": "",
                "date": "",
                "link": "url",
                "text": "",
                "icon_type": ""
            },
            {
                "headlines": "",
                "date": "",
                "link": "url",
                "text": "",
                "icon_type": ""
            }
        ]
    }
);
}


function routeProjectCustomerteamRequest(req, res, next) {
    return res.status(200).json({
        "customer_team": [  
            {
                "name": "srini",
                "email": "@gmail.com",
                "role": "rname"
            },
            {
                "name": "vel",
                "email": "@gmail.com",
                "role": "rname"
            },
            {
                "name": "nitin",
                "email": "@gmail.com",
                "role": "rname"
            }
        ]
    }
    );
}
function routeProjectProjectteamRequest(req, res, next) {
    return res.status(200).json({
        "project_team": {
            "Owners": {
                "name": "Phil Harrison",
                "title": "CEO",
                "title_expanded": "Cheif Executive Oﬃcer",
                "photo": "url",
                "phone_number": "+1(234) 567-890",
                "email": "phil.harrison@perkinswill.com",
                "address": {
                    "street_address1": "410 N. Michigan Ave.",
                    "street_address2": "Chicago, IL 60611"
                }
            },
            "Architects": [
                {
                    "name": "Waylon Smithers",
                    "title": "Managing Principle",
                    "title_expanded": "Managing Principle",
                    "photo": "url",
                    "phone_number": "+1(234) 567-890",
                    "email": "phil.harrison@perkinswill.com",
                    "address": {
                        "street_address1": "410 N. Michigan Ave.",
                        "street_address2": "Chicago, IL 60611"
                    }
                },
                {
                    "name": "Sterling Archer",
                    "title": "Project Manager",
                    "title_expanded": "Project Manager",
                    "photo": "url",
                    "phone_number": "+1(234) 567-891",
                    "email": "sterling.archer@perkinswill.com",
                    "address": {
                        "street_address1": "410 N. Michigan Ave.",
                        "street_address2": "Chicago, IL 60611"
                    }
                },
                {
                    "name": "Pam Poovey",
                    "title": "Design Principal",
                    "title_expanded": "Design Principal",
                    "photo": "url",
                    "phone_number": "+1(234) 567-892",
                    "email": "pam.poovey@perkinswill.com",
                    "address": {
                        "street_address1": "410 N. Michigan Ave.",
                        "street_address2": "Chicago, IL 60611"
                    }
                }
            ],
            "Contractors": {
                "name": "Max Power",
                "title": "Lead Project Manager",
                "title_expanded": "Lead Project Manager",
                "photo": "url",
                "phone_number": "+1(234) 567-895",
                "email": "pam.poovey@perkinswill.com",
                "address": {
                    "street_address1": "410 N. Michigan Ave.",
                    "street_address2": "Chicago, IL 60611"
                }
            }
        }
    }
   );
}

function routeAuthenticateRequest(req, res, next) {
    
    var uname = req.body.user_name;
    var pwd = req.body.password;
    
    var jsonResp = {};
    
    if (uname==='user1@gmail.com'&&pwd==='password1') { 
        jsonResp = {
            "success": true,
            "access_token": "YXA6ojkALgyxcpqVZwTfKxEPNsBpU5g"
        };
    }
    if (uname === 'user2@gmail.com' && pwd === 'password2') {
        jsonResp = {
            "error": {
                "isError": "true",
                "errorCode": "100",                            
                "errorMessage": "Invalid user name"
            }
        };

    }
    if (uname === 'user3@gmail.com' && pwd === 'password3') {
        jsonResp = {
            "error": {
                "isError": "true",
                "errorCode": "101",                            
                "errorMessage": "Invalid password"
            }
        };
    }
    //else { 
    //    jsonResp = {
    //        "error": {
    //            "isError": "true",
    //            "errorCode": "100",                            
    //            "errorMessage": "Invalid params!"
    //        }
    //    };
    
    //}

    return res.status(200).json(jsonResp);

    }

        

//    return res.status(200).json({
//        "success": true,
//        "access_token": "YXA6ojkALgyxcpqVZwTfKxEPNsBpU5g"
//    }
//    );
//}

function routeCustomersRequest(req, res, next) {
    return res.status(200).json({
        "customers_list": [  
            {
                "customer_name": "3M",
                "customer_id": "12345"
            },
            {
                "customer_name": "ADP",
                "customer_id": "12346"
            },
            {
                "customer_name": "Civil Arch",
                "customer_id": "12347"
            },
            {
                "customer_name": "Perkin",
                "customer_id": "12348"
            }
        ]
    }
    );
}

function routeCustomerSetupRequest(req, res, next) {
    return res.status(200).json({
        "message":"created successfully!"
    }
    );
}


function routeProjectSetupRequest(req, res, next) {
    return res.status(200).json({
        "message": "created successfully!"
    }
    );
}


router.get(basePath + '/projects', routeProjectsRequest);
router.get(basePath+'/:projectId/details', routeProjectDetailsRequest);
router.get(basePath +'/:projectId/status', routeProjectStatusRequest);
router.get(basePath +'/:projectId/goals', routeProjectGoalsRequest);
router.get(basePath +'/:projectId/notifications', routeProjectNotificationsRequest);
router.get(basePath +'/:projectId/customerteam', routeProjectCustomerteamRequest);
router.get(basePath +'/:projectId/projectteam', routeProjectProjectteamRequest);
router.post(basePath +'/authenticate', routeAuthenticateRequest);

//for Admin UI
router.get(basePath + '/customers', routeCustomersRequest);
router.post(basePath + '/customers', routeCustomerSetupRequest);
router.post(basePath + '/projects', routeProjectSetupRequest);


module.exports = router;