describe('countryAppViews', function(){
    beforeEach(module('countryAppViews'));

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
    })
});