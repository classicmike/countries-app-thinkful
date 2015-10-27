viewsModule.config(function($routeProvider){
    $routeProvider.when('/countries', {
        templateUrl: './countries-list/countries-list.html',
        controller: 'CountriesListController as countriesListControl'
    })
}).controller('CountriesListController', ['countriesAppCountries', '$q', '$location', '$sce', function(countriesAppCountries, $q, $location, $sce){
    // countries code here

    this.init = function(){
        //initialise the countries
        this.countriesListLoading = false;
        this.countries = [];
        this.countriesSize = this.countries.length;

        this.retrieveCountries();
    };


    this.retrieveCountries = function(){
        console.log('Countries loading is fired');
        this.countriesListLoading = true;

        //countries list loaded
        countriesAppCountries()
            .then(
                this.processCountries.bind(this),
                this.processError.bind(this)
        ).then(function(){
            console.log('Countries have been FULLY LOADED');
            this.countriesListLoading = false;
        });

    };

    this.processError = function(error){
        console.log(error);
        return error;
    };

    this.processCountries = function(results){
        var data = results;
        console.log(results);

        if(Array.isArray(data.geonames)){
            //get all of the results for the country
            this.countries = data.geonames;
            this.countriesSize = this.countries.length;
        }

        return results;

    };

    this.goToCountry = function(country){
        $location.url("\/countries\/" + country);
    };

    this.init();

}]);