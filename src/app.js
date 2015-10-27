angular.module('countriesApp',['countryAppViews', 'ngRoute', 'ngAnimate', 'countriesAppHelpers'])
    .config(function($locationProvider, $routeProvider){
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });