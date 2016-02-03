var http = require('http');
var url = require('url');
var Router = require('router');
var finalhandler = require('finalhandler');
var marky = require('marky-markdown');
var templates = require('./templates');
var connect = require('connect');
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var stat = Promise.promisify(fs.stat);

// Route handlers
var handleIndex = (req, res) => {
    fs.stat(path.join(__dirname, 'data', 'pages'), () => {

    }, (err) => {
        res.statusCode = 500;
        res.end('Failed to load list');
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var template = templates.get('index');
    var html = template({title: "Wiki", pages: [{title: 'ok', 'url': 'view/ok'}]});
    res.write(html);
    console.log(html)
    res.end();
};

var handleSave = () => {

};

var handleEdit = () => {

};

var handleNew = () => {

};

var handleView = () => {

};

var handleMissing = (req, res) => {
    res.writeHead(404, 'page not found');
    res.end();
};

// Register routes
var router = new Router();
router.get('/', handleIndex);

// Create server
var server = connect();

server.use((req, res) => {
    router(req, res, finalhandler(req, res));
});

var port = process.env.port || 8080;
var server = http.createServer(server).listen(port);
console.log('-> Listening for incoming connection on: ' + port + "...");
