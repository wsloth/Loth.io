'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('watch', function() {
    gulp.watch('./src/**/*.scss', ['compile:sass']);
    gulp.watch('./src/**/*.html', ['move:html']);
    gulp.watch('./src/**/*.js', ['move:js']);
    gulp.watch('./src/**/*.css', ['move:css']);
});


gulp.task('clean', function () {});

gulp.task('compile:sass', function () {
    gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('move:html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('move:js', function () {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./public'));
});

gulp.task('move:css', function () {
    return gulp.src('./src/**/*.css')
        .pipe(gulp.dest('./public'));
});


gulp.task('default', ['clean', 'compile:sass', 'move:files']);