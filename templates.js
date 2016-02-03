// templates provides a map of cached templates that can be retrieved
// by name.

var fs = require('fs');
var path = require('path');

var Handlebars = require('Handlebars');
var layouts = require('handlebars-layouts');

// The cache to look up compiled templates.
var templates = new Map();

// Use layouts
Handlebars.registerHelper(layouts(Handlebars));
Handlebars.registerPartial('layout', fs.readFileSync(path.join('templates', 'layout.hbs'), 'utf8'));

// Given a name for the template and a filename,
// compile the file's contents into a handlebars template
// and set it on the `templates` cache.
var compileTemplate = (name, file) => {
    var filename = path.join('templates', file);
    var template = Handlebars.compile(fs.readFileSync(filename, 'utf-8'));
    templates.set(name, template);
};

// Pre-compile templates
compileTemplate('index', 'index.hbs');
compileTemplate('view', 'view.hbs');
compileTemplate('edit', 'edit.hbs');

// Make the templates cache publicly available
module.exports = templates;
