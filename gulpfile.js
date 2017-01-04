'use strict';

const gulp = require('gulp');

const concat    = require('gulp-concat');
const cssmin    = require('gulp-minify-css');
const rename    = require('gulp-rename');
const sass      = require('gulp-sass');
const babel     = require('gulp-babel');
const uglify    = require('gulp-uglify');
const webserver = require('gulp-webserver');
const git       = require('gulp-git');
const plumber   = require('gulp-plumber');
const prompt    = require('gulp-prompt');

const paths = {
  js:   './src/js/*.js',
  sass: './src/sass/**/*.scss'
};

gulp.task('js', () => {
  return gulp.src(paths.js)
    .pipe(plumber({
      errorHandler: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/'));
});

gulp.task('css', () => {
  return gulp.src(paths.sass)
    .pipe(plumber({
      errorHandler: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(rename("style.css"))
    .pipe(gulp.dest('./css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', () => {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.sass, ['css']);
});

gulp.task('server', () => {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 3030,
      fallback: 'index.html'
    }));
});

gulp.task('default', ['js', 'css', 'watch', 'server']);
