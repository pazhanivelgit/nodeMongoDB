var mongoose = require('./db.js');

var customer_schema = new mongoose.Schema({
    customer_name: String, 
    customer_id: { type:Number, index: true } 
});

var customer = mongoose.model('customer', customer_schema);

module.exports = customer;