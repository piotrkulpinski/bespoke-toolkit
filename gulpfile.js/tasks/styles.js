'use strict';

var stylesTask = function (gulp, plugins, config, helpers) {
  gulp.task('styles', function () {
    var src = config.paths.src + '/styles/*.scss';
    var dest = config.paths.dest + '/styles';

    var postcssPlugins = [
      require('postcss-import')(),
      require('autoprefixer')({
        flexbox: false,
        browsers: ['last 2 versions']
      })
    ];

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
      .pipe(plugins.sass({ outputStyle: 'expanded', includePaths: [config.paths.src + '/bower_components'] }))
      .pipe(plugins.postcss(postcssPlugins))
      .pipe(gulp.dest(dest))
      .pipe(plugins.browserSync.stream());

    stream
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
      .pipe(gulp.dest(dest))
      .pipe(plugins.browserSync.stream());

    return stream;
  });
};

module.exports = stylesTask;
