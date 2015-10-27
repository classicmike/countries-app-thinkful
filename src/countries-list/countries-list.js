viewsModule.config(function($routeProvider){
    $routeProvider.when('/countries', {
        templateUrl: './countries-list/countries-list.html',
        controller: 'CountriesListController as countriesListControl'
    })
}).controller('CountriesListController', ['countriesAppCountries', '$q', '$location', function(countriesAppCountries, $q, $location){
    // countries code here

    this.init = function(){
        //initialise the countries
        this.countries = [];
        this.countriesSize = this.countries.length;
        this.retrieveCountries();
    };

    this.retrieveCountries = function(){
        countriesAppCountries()
            .then(
                this.processCountries.bind(this),
                this.processError.bind(this)
            )
    };

    this.processError = function(error){
        console.log(error);
    };

    this.processCountries = function(results){
        var data = results.data;
        console.log(results);

        if(Array.isArray(data.geonames)){
            //get all of the results for the country
            this.countries = data.geonames;
            this.countriesSize = this.countries.length;
        }

    };

    this.goToCountry = function(country){
        $location.path('/#/countries/' + country);
    };

    this.init();

}]);