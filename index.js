// index.js starts the main server and hadles routes.

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var Router = require('router');
var finalhandler = require('finalhandler');
var connect = require('connect');
var Promise = require('bluebird');
var glob = Promise.promisify(require('glob'));
var bodyParser = require('body-parser');

var Page = require('./page');
var templates = require('./templates');
var errorResponse = require('./utilities.js').errorResponse;
var redirect = require('./utilities.js').redirect;
var extractPageTitle = require('./utilities.js').extractPageTitle;
var htmlResponse = require('./utilities.js').htmlResponse;

