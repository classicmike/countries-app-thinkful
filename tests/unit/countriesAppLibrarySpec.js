describe('countriesAppLibrary', function () {
    beforeEach(module('countriesAppLibrary'));

    /*beforeEach(function(){
     module('countryAppsLibrary');

     module(function($provide){
     // Fake Get list of countries
     })
     });*/

    //test out the counttires app ajax
    /*describe("countriesAppAjax", function(){
     it('should make a standard ajax request to the geonames API sucessfully', inject(function(countriesAppAjax, $rootScope, $httpBackend, API_URL, API_USERNAME, COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET, API_URL_REPLACE){
     var requestUrl = API_URL.replace(API_URL_REPLACE, COUNTRIES_API_ENDPOINT_NAME) + API_USERNAME;

     //we are expecting that the request is completed successfully
     $httpBackend.expect(AJAX_METHOD_GET, requestUrl).respond(200);

     var requestStatus = false;

     countriesAppAjax(COUNTRIES_API_ENDPOINT_NAME, AJAX_METHOD_GET).then(function(){
     requestStatus = true;
     });

     $rootScope.$digest();
     $httpBackend.flush();

     expect(requestStatus).toBe(true);
     $httpBackend.verifyNoOutstandingRequest();

     }));
     });*/

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

        it('should get a list of countries', function(done){
            //fake the countries app ajax factory

            module(function($provide){
                $provide.factory('countriesAppAjax', function($q){
                    return function(){
                        console.log('Going to return a promise');
                        var deferred = $q.defer();
                        deferred.resolve(countriesMockResponse);
                        console.log(deferred.promise);

                        return deferred.promise;
                    }
                });
            });

            inject(function(countriesAppCountries){
                var returnedPromise = countriesAppCountries();
                console.log(returnedPromise);

                returnedPromise.then(function(result){
                    console.log('Promise Statisfied');
                    //expect the returned promise to have a list of countries equal to the mocked countries object
                    expect(result).toEqual(countriesMockResponse);
                }, function(error){
                    console.log(error);
                    console.log('AN ERROR HAS OCCURRED');
                }).then(done);

            });
        });

    });
});