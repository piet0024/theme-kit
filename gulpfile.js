var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');
  browserSync = require('browser-sync').create();

gulp.task('build-theme', function() {
  return gulp.src(['src/scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: [
      'Chrome >= 35',
      'Firefox >= 38',
      'Edge >= 12',
      'Explorer >= 10',
      'iOS >= 8',
      'Safari >= 8',
      'Android 2.3',
      'Android >= 4',
      'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/css/'))
});

gulp.task('watch', ['build-theme'], function() {
  gulp.watch(['scss/*.scss'], ['build-theme']);
});

gulp.task('build-watch', ['build-theme'], function(done) {
  browserSync.reload();
  done();
})

gulp.task('serve', ['build-theme'], function () {
  browserSync.init({
      server: {
          baseDir: "./src",
          index: "index.html"
      }
  });
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['build-watch']);
  gulp.watch("src/index.html").on('change', browserSync.reload);
});


gulp.task('default', ['build-theme'], function() {
});



