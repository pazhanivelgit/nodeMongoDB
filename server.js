/* jshint strict: true */
/* global require, console */


/**
 * module dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

/**
 * init
 */
var routes = require('./routes/routes2.js');
var http_server = express();




/**
 * dispatch requests to the router
 */
http_server.disable('x-powered-by');
http_server.enable('etag', 'strict');
http_server.use(bodyParser.json());
http_server.use(morgan('dev'));
//http_server.use(express.urlencoded());
//http_server.use(http_server.router);

//http_server.use('/', routes);
http_server.use('/', express.static(__dirname + '/views'));
http_server.use('/', routes);

http_server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.end('error ' + err.message);
});

//process.on('uncaughtException', function (err) {
//    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
//    console.error(err.stack)
//    //process.exit(1)
//})

/**
 * instantiate express server
 */
http_server.listen(8080, function () {
    'use strict';
    console.log('Express server listening on port 3000');
});
