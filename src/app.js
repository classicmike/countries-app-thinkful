angular.module('countriesApp',['countryAppViews', 'ngRoute', 'ngAnimate'])
    .config(function($locationProvider, $routeProvider){
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });