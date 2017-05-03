const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('html', function(){
		return gulp.src('source/html/**/*.html')
		.pipe(gulp.dest('compiled/html/'));
});

gulp.task('css', function(){
    return gulp.src('source/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('compiled/css/'))
});

gulp.task('js', function(){
    return gulp.src('source/js/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('compiled/js/'))
});

gulp.task('default', ['html', 'css', 'js']);
