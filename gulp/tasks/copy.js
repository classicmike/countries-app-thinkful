var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');


module.exports = function(copyConfig, destination){
    gulp.task('copy', function(){
        gulp.src(copyConfig.assetsToCopy)
            .pipe(gulp.dest(destination))
    });
};