var gulp = require('gulp');
var connect = require('gulp-connect');


module.exports = function(connectConfig){
    connect.server({
        root: connectConfig.root
    });
};
