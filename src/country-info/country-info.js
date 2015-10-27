viewsModule.config(function($routeProvider){
$routeProvider.when('/countries/:country', {
    templateUrl: './country-info/country-info.html',
    controller: 'CountryInfoController as countryInfo',
    resolve: {

    }
})
}).controller('CountryInfoController', ['$q', function($location, $q){
    this.init = function(){

    };
}]);