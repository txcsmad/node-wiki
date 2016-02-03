var Handlebars = require('Handlebars');
var layouts = require('handlebars-layouts');
var fs = require('fs');
var path = require('path');

var templates = new Map();

Handlebars.registerHelper(layouts(Handlebars));
Handlebars.registerPartial('layout', fs.readFileSync(path.join('templates', 'layout.hbs'), 'utf8'));

var compileTemplate = (name, file) => {
    var filename = path.join('templates', file);
    var template = Handlebars.compile(fs.readFileSync(filename, 'utf-8'));
    templates.set(name, template);
};

// Pre-compile templates
compileTemplate('index', 'index.hbs');
compileTemplate('view', 'view.hbs');
compileTemplate('edit', 'edit.hbs');

module.exports = templates;
