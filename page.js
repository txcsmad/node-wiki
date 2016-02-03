var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var writeFile = Promise.promisify(fs.writeFile);
var readFile = Promise.promisify(fs.readFile);

var filename = (title) => {
    return title + ".md";
};

var location = (title) => {
    return path.join('.', 'data', 'pages', filename(title));
};

var Page = {
    // Create a page with title string and body byte buffer
    init: (title, body) => {
        this.title = title;
        this.body = body;
    },

    save: () => {
        return writeFile(location(title), this.body, {
            mode: 0o600
        });
    }
};

Page.load = (title) => {
    return new Promise((resolve, reject) => {
        readFile(location(title)).then((body) => {
            return resolve(new Page(title, body));
        }, (err) => {
            return reject(err);
        });
    };
};

module.exports = Page;
