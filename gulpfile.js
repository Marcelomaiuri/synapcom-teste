let gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  scssFiles = './assets/css/style.scss',
  cssDest = './dist',
  sassProdOptions = {
    outputStyle: 'compressed'
  }

gulp.task('sassprod', function () {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest));
});
gulp.task('watch', function () {
  gulp.watch(scssFiles, ['sassprod']);
});
gulp.task('default', ['sassprod', 'watch']);