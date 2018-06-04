var fileinclude = require('gulp-file-include');
var log = require("fancy-log")
var sass = require('gulp-sass');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence('sass', 'includeall')
});

gulp.task('sass', function () {
  log("Compiling styles SASS")
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/staging/'));
});

gulp.task('includeall', function () {
  log("Including files")
  gulp.src(['./src/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});




