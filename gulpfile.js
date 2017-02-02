//Include Dependencies

var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
concatcss = require('gulp-concat-css'),
cssnano = require('gulp-cssnano'),
rename = require('gulp-rename'),
sourcemaps = require('gulp-sourcemaps');

//Include Paths
var paths = {
	src: './app/',
	build: './build/'
}

//Gulp Tasks

gulp.task('styles', function(){
	return gulp.src(paths.src + 'css/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
				browsers: ['last 10 versions'],
				cascade: false
			}))
		.pipe(concatcss('all.css'))
		.pipe(cssnano())		
		.pipe(rename('app.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.build + 'css/'));
});

gulp.task('serve', ['styles'], function() {
	gulp.watch(paths.src + 'css/**/*.css', ['styles']); 
});

//Default gulp command
gulp.task('default', ['serve']);
