const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('default', () => {
  gulp.watch('jasmine/spec/feedreader.js').on('change', browserSync.reload);

  browserSync.init({
    server: './'
  });
});