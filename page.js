var path = require('path');
var fs = require('fs');

var Promise = require('bluebird');
var writeFile = Promise.promisify(fs.writeFile);
var readFile = Promise.promisify(fs.readFile);
var unlink = Promise.promisify(fs.unlink);
var marked = require('marked');

var extension = ".md";
var filename = (title) => title + extension;
var location = (title) => path.join('.', 'data', 'pages', filename(title));

var Page = function(title, body) {
    this.title = title;
    this.body = body;
};

Page.prototype.html = function() {
    return marked(this.body.toString());
};

Page.prototype.save = function() {
    return writeFile(location(this.title), this.body, {
        mode: 0o600
    });
};

Page.load = (title) => {
    return new Promise((resolve, reject) => {
        readFile(location(title)).then((body) => {
            return resolve(new Page(title, body));
        }, (err) => {
            return reject(err);
        });
    });
};

Page.delete = (title) => {
    return unlink(location(title));
};

Page.extension = extension;

module.exports = Page;
