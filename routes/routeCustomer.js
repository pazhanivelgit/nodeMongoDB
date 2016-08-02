var util = require('../public/util');

exports.getCustomerById = function routeGetCustomerById(req, res, next) {
    var cus_id = req.params.customerId;
    if (cus_id) {
        
        var id = parseInt(cus_id);
        var customer = require("../model/customer");
        
        customer.find({ customer_id: id }, util.exculdeFields, function (err, customer) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (customer.length > 0) {
                    res.status(200).json(customer[0]);
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

exports.getAllCustomers=function routeGetAllCustomersRequest(req, res, next) {
    
    var customer = require("../model/customer");
    
    customer.find({}, util.exculdeFields, function (err, customers) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.name));
        } else {
            
            var resp = {
                'total_count': customers.length,
                'entries': customers
            }
            res.status(200).json(resp);
        }
    });
}

exports.addCustomer=function routeCustomerInsertRequest(req, res, next) {
    
    var c_name = req.body.customer_name;
    var c_id = req.body.customer_id;
    var c_folder_id = '5010309';
    
    if (c_name && c_id) {
        
        var customer = require("../model/customer");
        var _customer = new customer({ customer_name: c_name,customer_id: c_id,box_root_folder_id: c_folder_id});
        
        _customer.save(function (err, userObj) {
            if (err) {
                //console.log(err);
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                //console.log('saved successfully:', userObj);
                res.status(200).json(util.showMessage('saved successfully!'));
            }
        });
    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}

