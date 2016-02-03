var url = require('url');

exports.errorResponse = (res, statusCode, reason) => {
    res.statusCode = statusCode;
    res.end('error: ' + reason);
    return;
};

exports.extractPageTitle = (u) => {
    var parsed = url.parse(u);
    var components = parsed.path.split('/').filter((c) => c.length > 0);
    
    if (!(components.length > 1)) {
        return null;
    }

    return decodeURI(components[1]);
};

exports.redirect = (req, res, path) => {
    res.writeHead(301, {
      Location: (req.socket.encrypted ? 'https://' : 'http://') +
        req.headers.host + path}
    );
    res.end();
};

exports.htmlResponse = (res, html) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(html);
    res.end();
};
