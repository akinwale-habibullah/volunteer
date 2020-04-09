var express = require('express');
var middleware = require('./config/middleware.js');
var routes = require('./config/routes.js');

var app = express();

// set middleware
middleware(app, express);

// set routes
routes(app, express);

module.exports = app;
