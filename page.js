// Page provides functions for creating and managing wiki pages.

var path = require('path');
var fs = require('fs');

var Promise = require('bluebird');
var writeFile = Promise.promisify(fs.writeFile);
var readFile = Promise.promisify(fs.readFile);
var unlink = Promise.promisify(fs.unlink);
var marked = require('marked');

var extension = ".md"; // use Markdown extension to use for raw wiki page data

// Simple helpers to compute title and file location
// given the page title string
var filename = (title) => title + extension;
var location = (title) => path.join('.', 'data', 'pages', filename(title));

