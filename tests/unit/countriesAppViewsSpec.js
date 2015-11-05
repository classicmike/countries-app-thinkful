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
            module('countriesAppLibrary');

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
        describe('/countries route', function(){
           it('should gload the template controller and call the resolve', function(){
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
    });
});