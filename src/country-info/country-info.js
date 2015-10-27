viewsModule.config(function($routeProvider){
$routeProvider.when('/countries/:country', {
    templateUrl: './country-info/country-info.html',
    controller: 'CountryInfoController as countryInfo',
    resolve: {
        countryDetails: [
            'countryAppInfo',
            '$route',
            '$location',
            function(countryAppInfo, $route, $location){
                //get the country information
                var country = $route.current.params.country;

                if(!country){
                    $location.path('/');
                }

                //retrieve the country
                return countryAppInfo(country)
                    .then(function(response){
                        console.log(response);

                        var countryResult = response.data;

                        if(!countryResult.length){
                            $location.path('/');
                        }
                    },
                    function(response){
                        $location.path('/');
                    });
            }
        ]
    }
})
}).controller('CountryInfoController', ['$q', 'countryDetails', 'countryAppCapitalInfo', function($q, countryDetails, countryAppCapitalInfo){
    this.init = function(){
        this.country = countryDetails;
        this.retrieveCapitalCity();
    };

    this.retrieveCapitalCity = function(){
        countryAppCapitalInfo(this.country.capital, this.country.countryCode)
            .then(this.processCitySuccess.bind(this), this.processCityError.bind(this));
    };

    this.processCitySuccess = function(response){
        this.capitalCity = response;
    };

    this.processCityError = function(error){
        console.log(error);
        alert('Unfortunately an error has occurred in retrieving the capital city. Please check the logs for more details.');
    };
}]);