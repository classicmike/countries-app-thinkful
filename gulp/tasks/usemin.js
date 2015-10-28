var gulp = require('gulp');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

module.exports = function(useminConfig, indexFile, destination){
    console.log('Use min');
    gulp.task('usemin', ['copy'], function(){
        console.log(indexFile);
        console.log(destination);
        gulp.src(indexFile)
            .pipe(usemin({
                css: [minifyCss(), 'concat'],
                js: [ngmin(), uglify()]
            }))
            .pipe(gulp.dest(destination + '/'))
    });
};