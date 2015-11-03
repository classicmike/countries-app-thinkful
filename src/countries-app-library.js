angular.module('countriesAppLibrary', ['countriesAppHelpers'])
    //definition of constants
    .constant('API_URL', 'http://api.geonames.org/{PATH_WITH_PARAMETERS}')
    .constant('API_URL_REPLACE', '{PATH_WITH_PARAMETERS}')
    .constant('COUNTRIES_API_ENDPOINT_NAME', 'countryInfoJSON')
    .constant('API_USERNAME', '?username=koramaiku')
    .constant('SEARCH_API_ENDPOINT_NAME', 'searchJSON')
    .constant('NEIGHBOURS_API_ENDPOINT_NAME', 'neighboursJSON')
    .constant('AJAX_METHOD_GET', 'GET')
    .factory('countriesAppCountries', ['$http', '$q', 'API_URL', 'API_USERNAME', 'COUNTRIES_API_ENDPOINT_NAME', 'AJAX_METHOD_GET', 'countriesAppAjax', function($http, $q, API_URL, API_USERNAME, COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET, countriesAppAjax){
        // going to get the http request for the
        return function(){
            var defer = $q.defer();
            console.log('countriesAppCountries IS RUN');

            countriesAppAjax(COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET)
                .then(function(result){
                   defer.resolve(result);
                }, function(error){
                    defer.reject(error);
                });

            return defer.promise;
        }
    }]).factory('countriesAppAjax', ['$http', '$q', 'API_URL', 'API_USERNAME', 'API_URL_REPLACE', 'AJAX_METHOD_GET', function($http, $q, API_URL, API_USERNAME, API_URL_REPLACE, AJAX_METHOD_GET){
        return function(path, method, data){
            if(!method){
                method = AJAX_METHOD_GET;
            }

            if(!data && typeof data !== 'Object'){
                data = {};
            }

            var requestUrl = API_URL.replace(API_URL_REPLACE, path) + API_USERNAME;

            var config = {
                method: method,
                url: requestUrl
            };

            //check if the reqeust is a get and if so change the http config
            if(method === AJAX_METHOD_GET){
                config.params = data;
            } else {
                config.data = data;
            }

            var defer = $q.defer();

            $http(config).then(function(response){
                console.log('Getting the success response');
                console.log(response.data);
                defer.resolve(response.data);
            }, function(error){
                console.log('Getting the error data');
                console.log(error);
                defer.reject(error);
            });

            return defer.promise;
        }
    }]).factory('countryAppInfo', [
        '$http', '$q', 'COUNTRIES_API_ENDPOINT_NAME', 'AJAX_METHOD_GET', 'countriesAppAjax' , function($http, $q, COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET, countriesAppAjax){
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
                        defer.resolve(result.geonames[0]);
                    }, function(error){
                        defer.reject(error);
                    });

                return defer.promise;

            }
        }
    ]).factory('countryAppCapitalInfo', ['$http', '$q', 'SEARCH_API_ENDPOINT_NAME', 'AJAX_METHOD_GET', 'countriesAppAjax' , function($http, $q, SEARCH_API_ENDPOINT_NAME, AJAX_METHOD_GET, countriesAppAjax){
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
                        for(var i = 0; i < response.totalResultsCount; i++){
                            var result = results[i];
                            if(result.fcodeName.indexOf('capital') !== false){
                                defer.resolve(result);
                                break;
                            } else {
                                //need to check if this is the last count
                                if(i === response.totalResultsCount -1){
                                    defer.reject({type: 'no-capital-matches', message: 'No Capitals were found.'});
                                }
                            }

                        }
                    } else {
                        defer.reject({type: 'no-capital-matches', message: 'No Captials were found.'});
                    }

                }, function(error){
                    defer.reject(error);
                });

            return defer.promise;
        }
    }]).factory('countryAppNeighboursInfo', ['$http', '$q', 'NEIGHBOURS_API_ENDPOINT_NAME', 'AJAX_METHOD_GET', 'countriesAppAjax' , function($http, $q, NEIGHBOURS_API_ENDPOINT_NAME, AJAX_METHOD_GET, countriesAppAjax){
        return function(geonameId){
            var defer = $q.defer();

            //if no country was supplied....
            if(!geonameId){
                defer.reject({type: 'no-geoname-id', message: 'No Geoname id was supplied'});
            }

            //request data
            var requestData = {
                geonameId: geonameId
            };

            //need to run the request for the signature
            countriesAppAjax(NEIGHBOURS_API_ENDPOINT_NAME, AJAX_METHOD_GET, requestData)
                .then(function(response){
                    var results = response.geonames;
                    defer.resolve(results);
                }, function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
    }]);
