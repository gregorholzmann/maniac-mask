'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts', 'vendor', 'templates', 'assets'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/styles/sass/**/*.scss", ['sass']);
    gulp.watch("src/*.html", ['templates']);
    gulp.watch("src/js/*.js", ['scripts', 'vendor']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/styles/sass/*.scss")
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest("src/styles"))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(browserSync.stream());
});

gulp.task('vendor', function() {
  return gulp.src('src/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Vendor task complete' }))
    .pipe(browserSync.stream());
});

gulp.task('assets', function() {
  return gulp.src('src/assets/**/**/*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(notify({ message: 'Assets task complete' }));
});

gulp.task('templates', function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
