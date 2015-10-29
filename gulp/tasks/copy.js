var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');


module.exports = function(copyConfig, destination){
    gulp.task('copy', ['clean'], function(){
        return gulp.src(copyConfig.assetsToCopy)
            .pipe(gulp.dest(destination))
    });
};