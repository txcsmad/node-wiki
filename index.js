var http = require('http');
var url = require('url');
var Router = require('router');
var finalhandler = require('finalhandler');
var connect = require('connect');
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var glob = Promise.promisify(require('glob'));

var Page = require('./page');
var templates = require('./templates');

// Route handlers
var handleIndex = (req, res) => {
    glob(path.join(__dirname, 'data', 'pages', `*${Page.extension}`)).then((files) => {
        var pages = files.map(f => {
            var name = path.basename(f, Page.extension);
            return { 
                title: name,
                url: `view/${name}`
            };
        });

        var template = templates.get('index');
        var html = template({ 
            title: 'Wiki', 
            pages: pages
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
    }).catch((err) => {
        responseError(res, 400, 'specify an article');
    });
};

var responseError = (res, statusCode, reason) => {
    res.statusCode = statusCode;
    res.end('error: ' + reason);
    return;
};

var handleSave = () => {

};

var handleEdit = () => {

};

var handleNew = () => {

};

var handleView = (req, res) => {
    var parsed = url.parse(req.url);
    var components = parsed.path.split('/').filter((c) => c.length > 0);
    
    if (!(components.length > 1)) {
        responseError(res, 500, 'specify an article');
        return;
    }

    var name = decodeURI(components[1]);
    
    Page.load(name).then((page) => {
        var content = page.html();

        var template = templates.get('view');
        var html = template({
            title: name,
            page: {
                title: name,
                html: content
            }
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
    }, function() {
        responseError(res, 500, 'specify an article');
        return;
    });
};

// Register routes
var router = new Router();
router.get('/', handleIndex);
router.get('/view/*', handleView);

// Create server
var server = connect();

server.use((req, res) => {
    router(req, res, finalhandler(req, res));
});

var port = process.env.port || 8080;
var server = http.createServer(server).listen(port);
console.log('-> Listening for incoming connection on: ' + port + "...");
