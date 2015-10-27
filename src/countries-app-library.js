angular.module('countriesAppLibrary', [])
    //definition of constants
    .constant('API_URL', 'http://api.geonames.org/{PATH_WITH_PARAMETERS}')
    .constant('API_URL_REPLACE', '{PATH_WITH_PARAMETERS}')
    .constant('COUNTRIES_API_ENDPOINT_NAME', 'countryInfo')
    .constant('API_USERNAME', '?username=koramaiku')
    .factory('countriesAppCountries', ['$http', '$q', 'API_URL', 'API_USERNAME', 'COUNTRIES_API_ENDPOINT_NAME', 'API_URL_REPLACE', function($http, $q, API_URL, API_USERNAME, COUNTRIES_API_ENDPOINT_NAME, API_URL_REPLACE){
        // going to get the http request for the
        return function(){
            var requestUrl = API_URL.replace(API_URL_REPLACE, COUNTRIES_API_ENDPOINT_NAME) + API_USERNAME;
            return $http({
                method: 'GET',
                url: requestUrl,
                cache: true
            })
        }
    }]).factory('countriesAppAjax', ['$http', '$q', 'API_URL', 'API_USERNAME', 'API_URL_REPLACE', 'validateHttpRequestMethod', function($http, $q, API_URL, API_USERNAME, API_URL_REPLACE){
        return function(path, method, data){
            if(!method){
                method = 'GET';
            }

            method = validateHttpRequestMethod(method);

            if(!data && typeof data !== 'Object'){
                data = {};
            }

            var requestUrl = API_URL.replace('{PATH_WITH_PARAMETERS}', path) + API_USERNAME;

            var defer = $q.defer();
            $http({
                method: method,
                url: requestUrl,
                data: data,
                cache: true
            }).then(function(response){
                $q.resolve(response.data);
            }, function(error){
                $q.reject('Unfortuantely there was an error. Error: ' + error);
            });

            return defer.promise();
        }
    }]);
