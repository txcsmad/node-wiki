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

// Route handlers
var handleIndex = (req, res) => {
    glob(path.join(__dirname, 'data', 'pages', `*${Page.extension}`)).then((files) => {
        var pages = files.map(f => {
            var title = path.basename(f, Page.extension);
            return { 
                title: title,
                url: `view/${title}`
            };
        });

        var template = templates.get('index');
        var html = template({ 
            title: 'Wiki', 
            pages: pages
        });

        htmlResponse(res, html);
    }).catch((err) => {
        errorResponse(res, 400, 'specify an article');
    });
};

var handleNew = (req, res) => {
    var title = extractPageTitle(req.url);
    
    if (title == null) {
        errorResponse(res, 500, 'specify a title');
        return;
    }

    var template = templates.get('edit');
    var html = template({
        title: title,
        page: {
            title: title,
            content: '',
            newPage: true
        }
    });

    htmlResponse(res, html);
};

var handleView = (req, res) => {
    var title = extractPageTitle(req.url);
    
    if (title == null) {
        errorResponse(res, 500, 'specify an article');
        return;
    }
    
    Page.load(title).then((page) => {
        var content = page.html();

        var template = templates.get('view');
        var html = template({
            title: title,
            page: {
                title: title,
                content: content
            }
        });

        htmlResponse(res, html);
    }, function() {
        console.log('msg')
        handleNew(req, res);
    });
};

var handleEdit = (req, res) => {
    var title = extractPageTitle(req.url);
    if (title == null) {
        errorResponse(res, 500, 'specify an article');
        return;
    }

    Page.load(title).then((page) => {
        var markdown = page.body.toString().trim();

        var template = templates.get('edit');
        var html = template({
            title: title,
            page: {
                title: title,
                content: markdown
            }
        });

        htmlResponse(res, html);
    });
};

var handleSave = (req, res) => {
    var title = extractPageTitle(req.url);
    if (title == null) {
        errorResponse(res, 400, 'missing page name to save');
    }

    var page = new Page(title, new Buffer(req.body.content.trim()));
    page.save().then(() => {
        redirect(req, res, `/view/${title}`);
    }, (err) => {
        errorResponse(res, 500, err.message);
    });
};

var handleDelete = (req, res) => {
    var title = extractPageTitle(req.url);
    if (title == null) {
        errorResponse(res, 500, 'specify an article');
        return;
    }

    Page.delete(title).then(() => {
        redirect(req, res, '/');
    }, () => {
        errorResponse(res, 500, 'page not deleted');
    })
};

// Register routes
var router = new Router();
router.get('/', handleIndex);
router.get('/view/*', handleView);
router.get('/edit/*', handleEdit);
router.post('/save/*', handleSave);
router.post('/delete/*', handleDelete);

// Create server
var server = connect(); // using connect allows adding middleware functions
server.use(bodyParser.urlencoded({ // add body parser middleware
  extended: true
}));

server.use((req, res) => { // main route handling
    router(req, res, finalhandler(req, res));
});

// Listen on a port and print a useful message
var port = process.env.port || 8080;
var server = http.createServer(server).listen(port);
console.log('-> Listening for incoming connection on: ' + port + "...");
