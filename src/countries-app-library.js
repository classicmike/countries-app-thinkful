angular.module('countriesAppLibrary', [])
    //definition of constants
    .constant('API_URL', 'http://api.geonames.org/')
    .constant('COUNTRIES_API_ENDPOINT_NAME', 'countryInfo')
    .constant('API_USERNAME', 'username=koramaiku')
    .factory('countriesAppCountries', ['$http', '$q', 'API_URL', 'API_USERNAME', 'COUNTRIES_API_ENDPOINT_NAME', function($http, $q, API_URL, API_USERNAME, COUNTRIES_API_ENDPOINT_NAME){
        // going to get the http request for the
        return function(){
            return $http({
                method: 'GET',
                url: API_URL + COUNTRIES_API_ENDPOINT_NAME + '?' + API_USERNAME,
                cache: true
            })
        }
    }]);
