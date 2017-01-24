'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var SCSS_SRC = ['./scss/**/*.scss'];
var HTML_SRC = ['./**/*.html'];
var JS_SRC = ['./js/**/*.js'];

/*------------------------------------
 * Tasks Definitions
 *----------------------------------*/

/* SASS Compiler & Minifier */
gulp.task('sass', function() {
    return gulp.src('./scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

/* Minify HTML */
gulp.task('html-minify', function() {
    return gulp.src(HTML_SRC)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));
});

/* Uglify Javascript */
gulp.task('js-uglify', function() {
    return gulp.src(JS_SRC)
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('./dist/js'));
});


/*------------------------------------
 * Watchers Definitions
 *----------------------------------*/

gulp.task('sass:watch', function() {
    gulp.watch(SCSS_SRC, ['sass']);
});

gulp.task('html:watch', function() {
    gulp.watch(HTML_SRC, ['html-minify']);
});

gulp.task('js:watch', function() {
    gulp.watch(JS_SRC, ['js-uglify']);
});

// Watches everything
gulp.task('watch-all', ['sass:watch', 'html:watch', 'js:watch']);

// Default task
gulp.task('default', ['sass','html-minify','js-uglify']);