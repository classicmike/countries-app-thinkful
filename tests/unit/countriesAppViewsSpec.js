describe('countryAppViews', function(){
    beforeEach(module('countryAppViews'));

    describe('home', function(){
        //Test the routes and the template loading
        describe('/home route', function(){
            it('should load the template, controller and call the resolve for the home route', function(){
                inject(function($location, $rootScope, $httpBackend, $route){
                    $httpBackend.whenGET('./home/home.html').respond('...');

                    $rootScope.$apply(function(){
                        $location.path('/');
                    });

                    //if you have aliases then you MUST put in the as in there.
                    expect($route.current.controller).toBe("HomeCtrl as homeControl");
                    expect($route.current.loadedTemplateUrl).toBe("./home/home.html");

                    $httpBackend.flush();


                    $httpBackend.verifyNoOutstandingRequest();
                    $httpBackend.verifyNoOutstandingExpectation();
                });
            });
        });
    });

    describe('countries-list', function(){
        describe('countriesListController', function(){
            var controller, scope;

            beforeEach(inject(function($controller, $rootScope){
                scope = $rootScope.$new();
                controller = $controller('CountriesListController as countriesListControl', {
                    $scope: scope
                });
            }));

            var mockApiCountiresListResults = {
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

            it('should load the controller with a list of countries', function(){

                inject(function($httpBackend){
                    var requestUrl = 'http://api.geonames.org/countryInfoJSON?username=koramaiku';

                    $httpBackend.whenGET(requestUrl).respond(mockApiCountiresListResults);

                    controller.init();

                    scope.$digest();
                    $httpBackend.flush();

                    expect(controller.countries).toEqual(mockApiCountiresListResults.geonames);
                    expect(controller.countriesSize).toBe(mockApiCountiresListResults.geonames.length);

                    $httpBackend.verifyNoOutstandingRequest();
                    $httpBackend.verifyNoOutstandingExpectation();

                });
            });
        });

        describe('/countries route', function(){
            it('should load the template controller and call the resolve', function(){
                inject(function($location, $rootScope, $httpBackend, $route){
                    $httpBackend.whenGET('./countries-list/countries-list.html').respond('...');

                    $rootScope.$apply(function(){
                        $location.path('/countries');
                    });

                    expect($route.current.controller).toBe("CountriesListController as countriesListControl");
                    expect($route.current.loadedTemplateUrl).toBe("./countries-list/countries-list.html");

                    $httpBackend.flush();

                    $httpBackend.verifyNoOutstandingRequest();
                    $httpBackend.verifyNoOutstandingExpectation();
                });
            });
        });
    });

    describe('country-info', function(){
        beforeEach(module('countryAppViews'));

        describe('/countries:country route', function(){
           it('should load the template controller and call the resolve', function(){
               inject(function($location, $rootScope, $httpBackend, $route){
                   $httpBackend.whenGET('./country-info/country-info.html').respond('...');
                   $httpBackend.expectGET('http://api.geonames.org/countryInfoJSON?username=koramaiku&country=:country').respond(
                       {
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
                       }
                   );

                   $rootScope.$apply(function(){
                       $location.path('/countries/:country');
                   });

                   expect($route.current.controller).toBe("CountryInfoController as countryInfo");
                   expect($route.current.loadedTemplateUrl).toBe("./country-info/country-info.html");

                   $httpBackend.flush();
                   $httpBackend.verifyNoOutstandingRequest();
                   $httpBackend.verifyNoOutstandingExpectation();
               });
           });
        });

        describe('CountryInfoController', function(){
            var controller, scope;

            var countryToMockParameters = {
                areaInSqKm: "437072.0",
                capital: "Baghdad",
                continent: "AS",
                continentName: "Asia",
                countryCode: "IQ",
                countryName: "Iraq",
                currencyCode: "IQD",
                east: 48.575916,
                fipsCode: "IZ",
                geonameId: 99237,
                isoAlpha3: "IRQ",
                isoNumeric: "368",
                languages: "ar-IQ,ku,hy",
                north: 37.378029,
                population: "29671605",
                south: 29.069445,
                west: 38.795887
            };

            var mockCapitalsResponse = {
                totalResultsCount: 2,
                geonames: [
                    {
                        adminCode1: "07",
                        adminName1: "Mayorality of Baghdad",
                        countryCode: "IQ",
                        countryId: "99237",
                        countryName: "Iraq",
                        fcl: "P",
                        fclName: "city, village,...",
                        fcode: "PPLC",
                        fcodeName: "capital of a political entity",
                        geonameId: 98182,
                        lat: "33.34058",
                        lng: "44.40088",
                        population: 5672513,
                        toponymName: "Baghdad"
                    },
                    {
                        adminCode1: "07",
                        adminName1: "Mayorality of Baghdad",
                        countryCode: "IQ",
                        countryId: "99237",
                        countryName: "Iraq",
                        fcl: "A",
                        fclName: "country, state, region,...",
                        fcode: "ADM1",
                        fcodeName: "first-order administrative division",
                        geonameId: 98180,
                        name: "Mayorality of Baghdad",
                        lat: "33.34058",
                        lng: "44.40088",
                        population: 0,
                        toponymName: "Muḩāfaz̧at Baghdād"
                    }
                ]
            };

            var mockNeighboursResponse = {
                geonames: [
                    {
                        "adminCode1":"00",
                        "lng":"53",
                        "geonameId":130758,
                        "toponymName":"Islamic Republic of Iran",
                        "countryId":"130758",
                        "fcl":"A",
                        "population":76923300,
                        "countryCode":"IR",
                        "name":"Iran",
                        "fclName":"country, state, region,...",
                        "countryName":"Iran",
                        "fcodeName":"independent political entity",
                        "adminName1":"",
                        "lat":"32",
                        "fcode":"PCLI"
                    },
                    {
                        "adminCode1":"00",
                        "lng":"36",
                        "geonameId":248816,
                        "toponymName":"Hashemite Kingdom of Jordan",
                        "countryId":"248816",
                        "fcl":"A",
                        "population":6407085,
                        "countryCode":"JO",
                        "name":"Jordan",
                        "fclName":"country, state, region,...",
                        "countryName":"Jordan",
                        "fcodeName":"independent political entity",
                        "adminName1":"",
                        "lat":"31",
                        "fcode":"PCLI"
                    }
                ]

            };

            beforeEach(inject(function($controller, $rootScope){
                scope = $rootScope.$new();
                controller = $controller('CountryInfoController as countryInfo', {
                    $scope: scope,
                    countryDetails: countryToMockParameters
                });
            }));

            it('should load the controller with the required country info', function(){
                inject(function($httpBackend){
                    //mock the capital city api request
                     var capitalRequestUrl = 'http://api.geonames.org/searchJSON?username=koramaiku&country=' + countryToMockParameters.countryCode + '&isNameRequired=true&name_equals=' + countryToMockParameters.capital + '&q=' + countryToMockParameters.capital;
                     $httpBackend.whenGET(capitalRequestUrl).respond(mockCapitalsResponse);

                     //mock the neighbours api request
                     var neighboursRequestUrl = 'http://api.geonames.org/neighboursJSON?username=koramaiku&geonameId=' + countryToMockParameters.geonameId;
                     $httpBackend.whenGET(neighboursRequestUrl).respond(mockNeighboursResponse);

                     controller.init(countryToMockParameters);

                     scope.$digest();
                     $httpBackend.flush();

                     //put all of the expectations here
                     expect(controller.country).toEqual(countryToMockParameters);
                     expect(controller.capitalCity).toEqual(mockCapitalsResponse.geonames[0]);
                     expect(controller.neighbours).toEqual(mockNeighboursResponse.geonames);
                     expect(controller.countryFlagUrl).toBe('http://www.geonames.org/flags/x/' + countryToMockParameters.countryCode.toLowerCase() + '.gif');
                     expect(controller.countryMapUrl).toBe('http://www.geonames.org/img/country/250/' + countryToMockParameters.countryCode + '.png');

                     $httpBackend.verifyNoOutstandingRequest();
                     $httpBackend.verifyNoOutstandingExpectation();


                });
            });
        });
    });


});