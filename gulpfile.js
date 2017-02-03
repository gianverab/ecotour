//Include Dependencies
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
autoprefixer = require('gulp-autoprefixer'),
concatcss = require('gulp-concat-css'),
rename = require('gulp-rename'),
sourcemaps = require('gulp-sourcemaps'),
browsersync = require('browser-sync').create();

//Include Paths
var paths = {
	src: './app/',
	build: './build/'
}

//CSS Workflow
gulp.task('styles', function(){
	return gulp.src(paths.src + 'css/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([cssvars, nested]))
		.pipe(autoprefixer({
				browsers: ['last 10 versions'],
				cascade: false
			}))
		.pipe(concatcss('all.css'))
		.pipe(rename('app.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.build + 'css/'));
});

//HTML Workflow
gulp.task('html', function(){
	return gulp.src(paths.src + '*.html')
	    .pipe(gulp.dest(paths.build));
});

//Server set up and reload
gulp.task('serve', ['styles', 'html'], function (){
	browsersync.init({
		server: paths.build
	});
	gulp.watch(paths.src + 'css/**/*.css', ['styles']); 
	gulp.watch(paths.src + '*.html', ['html']);
	gulp.watch(paths.build + '*.html').on('change', browsersync.reload);
});

//Default gulp command
gulp.task('default', ['serve']);
