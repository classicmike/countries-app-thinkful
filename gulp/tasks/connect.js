var gulp = require('gulp');
var connect = require('gulp-connect');


module.exports = function(connectConfig){
    gulp.task('connect', function(){
        connect.server({
            root: connectConfig.root
        });
    });
};
