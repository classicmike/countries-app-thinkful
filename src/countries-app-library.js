angular.module('countriesAppLibrary', [])
    //definition of constants
    .constant('API_URL', 'http://api.geonames.org/')
    .constant('COUNTRIES_API_ENDPOINT_NAME', 'countryInfo')
    .constant('API_USERNAME', 'user=koramaiku')
    .factory('countriesAppCountries', ['$http', '$q', 'API_URL', 'API_USERNAME', function($http, $q, API_URL, API_USERNAME){
        // going to get the http request for the
        return function(){
            return $http({
                method: 'GET',
                url: API_URL + '?' + API_USERNAME,
                cache: true
            })
        }
    }]);