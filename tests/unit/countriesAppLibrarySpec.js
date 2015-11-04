describe('countriesAppLibrary', function () {
    beforeEach(module('countriesAppLibrary'));

    /**
     * Unit test for the countriesAppAjax Factory
     */
    describe("countriesAppAjax", function(){
        var _countriesAppAjax, $_rootScope, $_httpBackend, API_URL_CONSTANT, API_USERNAME_CONSTANT, COUNTRIES_API_ENDPOINT_NAME_CONSTANT, AJAX_METHOD_GET_CONSTANT, API_URL_REPLACE_CONSTANT;

        beforeEach(inject(function(countriesAppAjax, $rootScope, $httpBackend, API_URL, API_USERNAME, COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET, API_URL_REPLACE){
            _countriesAppAjax = countriesAppAjax;
            $_rootScope = $rootScope;
            $_httpBackend = $httpBackend;
            API_URL_CONSTANT = API_URL;
            API_USERNAME_CONSTANT = API_USERNAME;
            COUNTRIES_API_ENDPOINT_NAME_CONSTANT = COUNTRIES_API_ENDPOINT_NAME;
            AJAX_METHOD_GET_CONSTANT = AJAX_METHOD_GET;
            API_URL_REPLACE_CONSTANT = API_URL_REPLACE;
        }));


        it('should make a standard ajax request to the geonames API sucessfully', function(){
            var requestUrl = API_URL_CONSTANT.replace(API_URL_REPLACE_CONSTANT, COUNTRIES_API_ENDPOINT_NAME_CONSTANT) + API_USERNAME_CONSTANT;

            //we are expecting that the request is completed successfully
            $_httpBackend.expect(AJAX_METHOD_GET_CONSTANT, requestUrl).respond(200);

            var requestStatus = false;

            _countriesAppAjax(COUNTRIES_API_ENDPOINT_NAME_CONSTANT, AJAX_METHOD_GET_CONSTANT).then(function(){
                requestStatus = true;
            });

            $_rootScope.$digest();
            $_httpBackend.flush();

            expect(requestStatus).toBe(true);
            $_httpBackend.verifyNoOutstandingRequest();
        });

        it('should make a starndard ajax request to the geonames to the API and an error occurs', function(){
            var requestUrl = API_URL_CONSTANT.replace(API_URL_REPLACE_CONSTANT, COUNTRIES_API_ENDPOINT_NAME_CONSTANT) + API_USERNAME_CONSTANT;

            //we are expecting that the request is completed successfully
            $_httpBackend.expect(AJAX_METHOD_GET_CONSTANT, requestUrl).respond(500);

            var requestStatus = true;

            _countriesAppAjax(COUNTRIES_API_ENDPOINT_NAME_CONSTANT, AJAX_METHOD_GET_CONSTANT).then(function(){
                requestStatus = true;
            }).catch(function(){
                requestStatus = false;
            });

            $_rootScope.$digest();
            $_httpBackend.flush();

            expect(requestStatus).toBe(false);
            $_httpBackend.verifyNoOutstandingRequest();
        });



    });




    /**
     * Unit test for the countriesAppAjax Factory
     */
    describe("countriesAppCountries", function(){
        var countriesMockResponse = {
            geonames: [
                {
                    "areaInSqKm": "468.0",
                    "capital": "Andorra la Vella",
                    "continent": "EU",
                    "continentName": "Europe",
                    "Country Code": "AD",
                    "Country Name": "Andorra",
                    "population": "84000"
                },
                {
                    "areaInSqKm": "7686850.0",
                    "capital": "Canberra",
                    "continent": "OC",
                    "continentName": "Oceania",
                    "Country Code": "AU",
                    "Country Name": "Australia",
                    "population": "21515754"
                }
            ]
        };

        var countriesError = {
            status: {
                message: "user does not exist",
                value: 10
            }
        };

        var caughtCountriesError = {
            type: 'error',
            message: 'unfortunately an error has occurred'
        };


        it('should get a list of countries successfully', function(){
            module(function($provide){
                $provide.factory('countriesAppAjax', function($q){
                    return function(){
                        var deferred = $q.defer();
                        deferred.resolve(countriesMockResponse);
                        return deferred.promise;
                    }
                });
            });

            inject(function(countriesAppCountries, $rootScope){
                countriesAppCountries().then(function(result){
                    //expect the returned promise to have a list of countries equal to the mocked countries object
                    expect(result).toEqual(countriesMockResponse);
                });

                $rootScope.$digest();

            });
        });

        it('should get attempt to a list of countries however fail due to api error', function(){
            module(function($provide){
                $provide.factory('countriesAppAjax', function($q){
                    return function(){
                        var deferred = $q.defer();
                        deferred.resolve(countriesError);
                        return deferred.promise;
                    }
                });
            });

            inject(function(countriesAppCountries, $rootScope){
                countriesAppCountries().then(function(result){
                    expect(result).toEqual(countriesError);
                });

                $rootScope.$digest();
            });

        });

        it('should attempt to get a list of countries however the result will fail and be caught out', function(){
            module(function($provide){
                $provide.factory('countriesAppAjax', function($q){
                    return function(){
                        var deferred = $q.defer();
                        deferred.reject(caughtCountriesError);
                        return deferred.promise;
                    }
                });
            });

            inject(function(countriesAppCountries, $rootScope){
                var promiseFlag = true;
                countriesAppCountries().catch(function(result){
                    promiseFlag = false;
                });

                $rootScope.$digest();
                expect(promiseFlag).toBe(false);
            });

        });

    });

    /**
     *  Unit Tests on the Country App Info Factory
     */
    describe('countryAppInfo', function(){
        var countryMockResponse = {
            geonames: [
                {
                    "areaInSqKm": "7686850.0",
                    "capital": "Canberra",
                    "continent": "OC",
                    "continentName": "Oceania",
                    "Country Code": "AU",
                    "Country Name": "Australia",
                    "population": "21515754"
                }
            ]
        };

        var countryError = {
            status: {
                message: "user does not exist",
                value: 10
            }
        };

        it('should return a country object', function(){
            module(function($provide){
                $provide.factory('countriesAppAjax', function($q){
                    return function(){
                        console.log('Mock function is being run');
                        var deferred = $q.defer();
                        deferred.resolve(countryMockResponse);
                        return deferred.promise;
                    }
                });
            });

            inject(function(countryAppInfo, $rootScope){
                countryAppInfo('AU').then(function(result){
                    console.log(result);

                    //we would then need to take the single instance of a country from the array.
                    var mockResultToEvaluate = countryMockResponse.geonames[0];
                    expect(result).toEqual(mockResultToEvaluate);
                });

                $rootScope.$digest();
            });

        });

        it('should attempt to return a country object but fail due to no parameter being supplied', function(){
            var promiseStatus = true;
            inject(function(countryAppInfo, $rootScope){
                countryAppInfo().then(function(result){
                    promiseStatus = true;
                }, function(error){
                    console.log(error);
                    promiseStatus = false;
                });

                $rootScope.$digest();

                expect(promiseStatus).toBe(false);
            });
        });

        it('should attempt to return a country object but fail due to API error.', function(){
            module(function($provide){
                $provide.factory('countriesAppAjax', function($q){
                    return function(){
                        var deferred = $q.defer();
                        deferred.reject(countryError);
                        return deferred.promise;
                    }
                });
            });


            inject(function(countryAppInfo, $rootScope){
                countryAppInfo('AU').catch(function(error){
                    console.log('An error has occurred.');
                    expect(error).toEqual(countryError);
                });

                $rootScope.$digest();
            });
        });
    });


    /**
     * Unit Tests for retrieving the capital cities
     */



});