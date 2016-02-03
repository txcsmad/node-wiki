var gulp = require('gulp'); // see: http://gulpjs.com/
var nodemon = require('gulp-nodemon'); // nodemon monitors and restarts node processes on changes

// the start tasks restarts the app on
// changes to the files ending with the specified extensions.
// Usage: from the command line:
// $ gulp start
gulp.task('start', function() {
    nodemon({
        script: 'index.js', 
        ext: 'js html hbs',
        env: { 'NODE_ENV': 'development' }
    });
});
