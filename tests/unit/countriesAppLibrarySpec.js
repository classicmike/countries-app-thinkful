describe('countriesAppLibrary', function () {
    beforeEach(module('countriesAppLibrary'));

    /**
     * Unit test for the countriesAppAjax Factory
     */
    describe("countriesAppAjax", function(){
     it('should make a standard ajax request to the geonames API sucessfully', inject(function(countriesAppAjax, $rootScope, $httpBackend, API_URL, API_USERNAME, COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET, API_URL_REPLACE){
         console.log('need to test the countriesAppAjax functionality');
         var requestUrl = API_URL.replace(API_URL_REPLACE, COUNTRIES_API_ENDPOINT_NAME) + API_USERNAME;

         //we are expecting that the request is completed successfully
         $httpBackend.expect(AJAX_METHOD_GET, requestUrl).respond(200);

         var requestStatus = false;

         countriesAppAjax(COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET).then(function(){
            console.log('Response');
            requestStatus = true;
         });

         $rootScope.$digest();
         $httpBackend.flush();

         expect(requestStatus).toBe(true);
         $httpBackend.verifyNoOutstandingRequest();

        }));
     });

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
                    console.log('An error in the promise has been caught and thus been rejected');
                    console.log(result);
                    promiseFlag = false;
                });

                $rootScope.$digest();
                expect(promiseFlag).toBe(false);
            });

        });

    });
});