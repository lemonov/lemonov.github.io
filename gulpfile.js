var fileinclude = require('gulp-file-include');
var log = require("fancy-log")

gulp = require('gulp');

gulp.task('default', function () {
  taskFileInclude();
});

function taskFileInclude() {
  log("Including files")
  gulp.src(['./src/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
}
