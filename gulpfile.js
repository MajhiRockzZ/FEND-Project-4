const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('default', callback => {
  runSequence(['useref', 'fonts', 'watch'], callback);
});

gulp.task('watch', ['browserySync'], () => {
  gulp.watch('app/css/**/*.css', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/jasmine/**/*.js', browserSync.reload);
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('useref', () => {
  return gulp
    .src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean:dist', () => {
  return del.sync('dist');
});

gulp.task('build', callback => {
  runSequence('clean:dist', ['useref', 'fonts'], callback);
});
