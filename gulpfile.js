'use strict';

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var scssLint      = require('gulp-scss-lint');
var minifyCss     = require('gulp-minify-css');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var browserSync   = require('browser-sync');

var paths = {
  styles: [
    './styles/**/*.scss',
    './contrib/main.scss'
  ]
};

var onError = function (error) {
  console.error(error.message + '\n');
  console.error(error.fileName + ':' + error.lineNumber + '\n');

  this.emit('end');
};

/**
** Styles task
**/
gulp.task('styles', function () {
  var stream = gulp.src(paths.styles[0])
    .pipe(plumber(onError))
    .pipe(scssLint())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());

  stream
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss({ keepSpecialComments: 1 }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());

  return stream;
});

gulp.task('contribStyles', function () {
  return gulp.src(paths.styles[1])
    .pipe(plumber(onError))
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

  gulp.watch(paths.styles, ['styles', 'contribStyles']);
  gulp.watch('./contrib/*.html', browserSync.reload);
});
