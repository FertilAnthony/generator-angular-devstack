'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var stream = require('vinyl-source-stream2');

var args = require('./utils/cli-args');
var paths = require('./utils/paths');
var handlers = require('./utils/handlers');

var entries = paths.sources.entries;

module.exports = function() {
  var optimize = args.optimize;
  return browserify({
      entries: entries.vendor,
      insertGlobals: true,
      debug: !optimize
    })
    .bundle()
    // Catch errors
    .on('error', handlers.onBrowserifyError)
    // Bundle to a single file
    .pipe(stream('vendor.js'))
    // Minimify app js only in production
    .pipe(optimize ? uglify({
      mangle: true
    }) : util.noop())
    // Output it to our dist folder
    .pipe(gulp.dest(paths.dist.scripts))
  ;
};
