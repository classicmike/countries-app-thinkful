angular.module('countriesAppLibrary', [])
    //definition of constants
    .constant('API_URL', 'http://api.geonames.org/{PATH_WITH_PARAMETERS}')
    .constant('API_URL_REPLACE', '{PATH_WITH_PARAMETERS}')
    .constant('COUNTRIES_API_ENDPOINT_NAME', 'countryInfoJSON')
    .constant('API_USERNAME', '?username=koramaiku')
    .constant('SEARCH_API_ENDPOINT_NAME', 'searchJSON')
    .constant('AJAX_METHOD_GET', 'GET')
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
                method = AJAX_METHOD_GET;
            }

            method = validateHttpRequestMethod(method);

            if(!data && typeof data !== 'Object'){
                data = {};
            }

            var requestUrl = API_URL.replace(API_URL_REPLACE, path) + API_USERNAME;

            var defer = $q.defer();
            $http({
                method: method,
                url: requestUrl,
                data: data,
                cache: true
            }).then(function(response){
                $q.resolve(response.data);
            }, function(error){
                $q.reject(error);
            });

            return defer.promise();
        }
    }]).factory('countryAppInfo', [
        '$http', '$q', 'API_USERNAME', 'COUNTRIES_API_ENDPOINT_NAME', 'AJAX_METHOD_GET', 'countriesAppAjax' , function($http, $q, COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET, countriesAppAjax){
            return function(country){
                var defer = $q.defer();

                //if no country was supplied....
                if(!country){
                    $q.reject({type: 'no-country', message: 'No country was supplied'});
                }

                //request data
                var requestData = {
                    country: country
                };

                //need to run the request for the signature
                countriesAppAjax(COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET, requestData)
                    .then(function(result){
                        $q.resolve(result.data);
                    }, function(error){
                        $q.reject(error);
                    });

                return defer.promise();

            }
        }
    ]).factory('countryAppCapitalInfo', ['$http', '$q', 'API_USERNAME', 'SEARCH_API_ENDPOINT_NAME', 'AJAX_METHOD_GET', 'countriesAppAjax' , function($http, $q, SEARCH_API_ENDPOINT_NAME, AJAX_METHOD_GET, countriesAppAjax){
        return function(capitalCity, country){
            var defer = $q.defer();

            //if no country was supplied....
            if(!capitalCity || !country){
                $q.reject({type: 'no-capital', message: 'No Capital City or Country Code was supplied'});
            }

            //request data
            var requestData = {
                q: capitalCity,
                isNameRequired: true,
                name_equals: capitalCity,
                country: country
            };

            //need to run the request for the signature
            countriesAppAjax(SEARCH_API_ENDPOINT_NAME, AJAX_METHOD_GET, requestData)
                .then(function(response){
                    var results = response.geonames;
                    if(response.totalResultsCount > 0){
                        console.log('The results count is: ' + response.data.totalResultsCount);


                        for(var i = 0; i < response.totalResultsCount; i++){
                            var result = results[i];
                            if(result.fcodeName.indexOf('capital') !== false){
                                $q.resolve(result);
                                break;
                            } else {
                                //need to check if this is the last count
                                if(i === response.totalResultsCount -1){
                                    $q.reject({type: 'no-capital-matches', message: 'No Captials were found.'});
                                }
                            }

                        }
                    } else {
                        $q.reject({type: 'no-capital-matches', message: 'No Captials were found.'});
                    }

                }, function(error){
                    $q.reject(error);
                });

            return defer.promise();

        }
    }]);
