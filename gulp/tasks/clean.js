var gulp = require('gulp');
var clean = require('gulp-clean');

var destination = require('../config').destination;

//clean code
module.exports = function(cleanConfig, destination){
    gulp.task('clean', function(){
        gulp.src(destination, {read: false})
            .pipe(clean());
    })
}