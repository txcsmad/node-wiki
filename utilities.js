// Repeatedly used http and URL utilities for the app.

var url = require('url');

// Sets the status code and error reason on a response.
exports.errorResponse = (res, statusCode, reason) => {
    res.statusCode = statusCode;
    res.end('error: ' + reason);
    return;
};

// Extract the page title string decoded from the url `u`.
exports.extractPageTitle = (u) => {
    var parsed = url.parse(u);
    var components = parsed.path.split('/').filter((c) => c.length > 0);
    
    if (!(components.length > 1)) {
        return null;
    }

    return decodeURI(components[1]);
};

// Redirect a request to the specified string path given 
// request and response objects.
exports.redirect = (req, res, path) => {
    res.writeHead(301, {
      Location: (req.socket.encrypted ? 'https://' : 'http://') +
        req.headers.host + path}
    );
    res.end();
};

// Set the status code, content type, and HTML content
// for a successful HTML response.
exports.htmlResponse = (res, html) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(html);
    res.end();
};
