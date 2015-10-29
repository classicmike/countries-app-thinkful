var gulp = require('gulp');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

module.exports = function(useminConfig, indexFile, destination){
    gulp.task('usemin', ['copy'], function(){
        return gulp.src(indexFile)
            .pipe(usemin({
                css: [minifyCss(), 'concat'],
                js: [ngmin(), uglify()]
            }))
            .pipe(gulp.dest(destination))
    });
};