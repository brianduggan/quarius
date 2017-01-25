var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    maps      = require('gulp-sourcemaps');

gulp.task('compileSass', function(){
  return gulp.src('./public/scss/application.scss')
             .pipe(maps.init())
             .pipe(sass())
             .pipe(maps.write())
             .pipe(gulp.dest('./public/css'));
});

gulp.task('watch-sass', function(){
  gulp.watch('./public/scss/*.scss', ['compileSass']);
});

gulp.task('default', ['compileSass', 'watch-sass']);
