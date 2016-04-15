'use strict';

var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: ['*', '!jshint'] });

var config  = require('../package.json').config;
var helpers = require('./helpers')(gulp, plugins, config);

/**
 * Batch plugins loader
 */
plugins.glob.sync('gulpfile.js/tasks/*').forEach(function (path) {
  path = path.replace('gulpfile.js/', './');
  require(path)(gulp, plugins, config, helpers);
});

/**
 * Build task
 */
gulp.task('build', function () {
  plugins.del([config.paths.dest]).then(function () {
    gulp.start([
      'styles',
      'templates'
    ]);
  });
});

/**
 * Default task
 */
gulp.task('default', function () {
  plugins.browserSync.init({
    server: './'
  })

  gulp.watch(config.paths.src + '/styles/**/*', ['styles']);
  gulp.watch(config.paths.src + '/templates/**/*.{twig,html}', ['templates']);
});
