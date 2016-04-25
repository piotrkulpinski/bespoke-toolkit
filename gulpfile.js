'use strict';

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var scssLint      = require('gulp-scss-lint');
var plumber       = require('gulp-plumber');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var browserSync   = require('browser-sync');

var paths = {
  styles: [
    './styles/**/*.scss',
    './contrib/main.scss'
  ]
};

/**
** Styles task
**/
gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(plumber(function (error) {
      console.error(error.message + '\n');
      console.error(error.fileName + ':' + error.lineNumber + '\n');

      this.emit('end');
    }))
    .pipe(scssLint())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('./contrib'))
    .pipe(browserSync.stream());
});

/**
** Default task
**/
gulp.task('default', function () {
  browserSync.init({
    server: './contrib/'
  });

  gulp.watch(paths.styles, ['styles']);
  gulp.watch('./contrib/*.html', browserSync.reload);
});
