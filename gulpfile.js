'use strict';

var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });

var config  = require('./package.json').config;

var styles = [
  './styles/**/*.scss',
  './contrib/main.scss'
];

/**
** Styles task
**/
gulp.task('styles', function () {
  return gulp.src(styles)
    .pipe(plugins.plumber(function (error) {
      console.error(error.message + '\n');
      console.error(error.fileName + ':' + error.lineNumber + '\n');

      this.emit('end');
    }))
    .pipe(plugins.scssLint())
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(plugins.postcss([
      require('autoprefixer')({
        flexbox: false,
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(gulp.dest('./contrib'))
    .pipe(plugins.browserSync.stream());
});

/**
** Default task
**/
gulp.task('default', function () {
  plugins.browserSync.init({
    server: './contrib/'
  });

  gulp.watch(styles, ['styles']);
  gulp.watch('./contrib/*.html', plugins.browserSync.reload);
});
