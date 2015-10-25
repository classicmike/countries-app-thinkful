viewsModule.config(function($routeProvider){
    $routeProvider.when('/countries', {
        templateUrl: './countries-list/countries-list.html',
        controller: 'CountriesListController as countriesList'
    })
}).controller('CountriesListController', ['countriesAppCountries', '$q', function(countriesAppCountries, $q){
    // countries code here
    countriesAppCountries()
        .then(function(result){
            var data = xml2json.parser(result.data);
            if(data.geonames.country.length > 0){
                console.log('No Results');
            }
            this.countries = data.geonames.country;
        }, function(error){
            console.log(error);
        });
}]);