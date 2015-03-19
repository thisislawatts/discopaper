var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

gulp.task('build', function() {
	gulp.src('discopaper.js')
	.pipe(plugins.uglify())
	.pipe(plugins.stripDebug())
	.pipe(plugins.rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('dist'));
});