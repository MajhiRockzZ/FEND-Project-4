const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const prettier = require('gulp-prettier');
const deploy = require('gulp-gh-pages');

gulp.task('default', () => {
  gulp.watch('jasmine/spec/feedreader.js').on('change', browserSync.reload);

  browserSync.init({
    server: './'
  });

  return gulp
    .src('jasmine/spec/feedreader.js')
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest('jasmine/spec/'));
});

gulp.task('deploy', () => {
  return gulp.src('./')
  .pipe(deploy());
});
