//Include Dependencies
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
importcss = require('postcss-import'),
autoprefixer = require('gulp-autoprefixer'),
rename = require('gulp-rename'),
newer = require('gulp-newer'),
imagemin = require('gulp-imagemin'),
sourcemaps = require('gulp-sourcemaps'),
browsersync = require('browser-sync').create();

//Include Paths
var cssSrc = './app/css/*.css',
cssDest = './build/css/',
imgSrc = './app/img/*',
imgDest = './build/img/',
htmlSrc = './app/*.html',
build = './build/';

//CSS Workflow
gulp.task('styles', function(){
	return gulp.src(cssSrc)
		.pipe(sourcemaps.init())
		.pipe(postcss([importcss, cssvars, nested]))
		.pipe(autoprefixer({
				browsers: ['last 10 versions'],
				cascade: false
			}))
		.pipe(rename('app.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(cssDest));
});

//HTML Workflow
gulp.task('html', function(){
	return gulp.src(htmlSrc)
	    .pipe(gulp.dest(build));
});

//Minify any new images
gulp.task('images', function(){
  return gulp.src(imgSrc)
  	.pipe(newer(imgDest))
    .pipe(imagemin({ 
    	optimizationLevel: 5 
    }))
    .pipe(gulp.dest(imgDest));
});

//Server set up and reload
gulp.task('serve', ['styles', 'html', 'images'], function (){
	browsersync.init({
		server: build
	});
	gulp.watch('./app/css/**/*.css', ['styles']); 
	gulp.watch('./build/css/*.css').on('change', browsersync.reload);
	gulp.watch(htmlSrc, ['html']);
	gulp.watch(build + '*.html').on('change', browsersync.reload);
});

//Default gulp command
gulp.task('default', ['serve']);
