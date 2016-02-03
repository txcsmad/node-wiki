// index.js starts the main server and hadles routes.

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var Router = require('router'); // register and handle routes 
var finalhandler = require('finalhandler'); // for catching if no routes matched
var connect = require('connect'); // the core of the app
var Promise = require('bluebird'); // Promises library, primarily used for transforming node.js callbacks to Promise style
var glob = Promise.promisify(require('glob')); // find files using glob patterns: for example: *.js
var bodyParser = require('body-parser'); // connect middleware for getting req POST body easily

var Page = require('./page');
var templates = require('./templates');
var errorResponse = require('./utilities.js').errorResponse;
var redirect = require('./utilities.js').redirect;
var extractPageTitle = require('./utilities.js').extractPageTitle;
var htmlResponse = require('./utilities.js').htmlResponse;

