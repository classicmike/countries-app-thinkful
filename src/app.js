angular.module('countriesApp',['countryAppViews', 'ngRoute', 'ngAnimate', 'countriesAppHelpers'])
    .config(function($locationProvider, $routeProvider){
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    })
    .run(function($rootScope, $location, $timeout){
        $rootScope.$on('$routeChangeError', function(){
            $location.path('/');
        });

        $rootScope.$on('$routeChangeStart', function(){
            $rootScope.isLoading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function(){
            $timeout(function(){
                $rootScope.isLoading = false;
            }, 1000);
        })
    });