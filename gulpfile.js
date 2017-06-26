var gulp = require('gulp');
var pug = require('gulp-htmlmin');
var less = require('gulp-less');
var uglify = require('gulp-uglify');											
var clean = require('gulp-clean');												
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-csso');
var stylish = require('jshint-stylish');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //uflify hack for ES6 Error


var DEV_SRC = {
	JS : 'client/app/**/*.js',
	JS_LIBS : 'client/assets/js/**/*.js',
	CSS : 'client/assets/css/*.css',
};

var DEV_DEST = {
	JS : 'client/assets/build/js',
	JS_NAME : 'app.min.js',
	CSS : 'client/assets/build/css',
	CSS_NAME : 'app.min.css',
};


/*gulp.task('html', function(){
  return gulp.src('client/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/html'))
});*/

gulp.task('css', function()
{
  return gulp.src(DEV_SRC.CSS)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(DEV_DEST.CSS))
});


gulp.task('js', function() 
{
  return gulp.src([DEV_SRC.JS_LIBS, DEV_SRC.JS])
  	.pipe(concat(DEV_DEST.JS_NAME))
    // .pipe(uglify({ mangle: false }))
    // .pipe(new UglifyJSPlugin())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(DEV_DEST.JS));
});

gulp.task('clean', function () {
  return gulp.src(DEV_DEST.JS+'/*.js', {read: false})
    .pipe(clean({force:true}));
});

gulp.task('default', [ 'js', 'css' ], function()
{
  gulp.watch([DEV_SRC.JS_LIBS, DEV_SRC.JS], ['js']);
  gulp.watch(DEV_SRC.CSS, ['css']);
});