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

                console.log('Need to resolve the country');
                console.log($route.current.params);
                //get the country information
                var country = $route.current.params.country;

                if(!country){
                    $location.path('/');
                }

                //retrieve the country
                var countryInfo = countryAppInfo(country)
                    .then(function(response){
                        console.log('Getting the response');
                        console.log(response);

                        var countryResult = response;

                        if(!countryResult.length){
                            //$location.path('/');
                        }

                        return countryResult;
                    },
                    function(response){
                        console.log(response);
                        //$location.path('/');
                    });

                return countryInfo;
            }
        ]
    }
})
}).controller('CountryInfoController', ['$q', '$sce' , 'countryDetails', 'countryAppCapitalInfo', 'countryAppNeighboursInfo', function($q, $sce, countryDetails, countryAppCapitalInfo, countryAppNeighboursInfo){
    this.init = function(country){
        this.country = country;
        console.log(this.country.countryCode);

        this.countryFlagUrl = 'http://www.geonames.org/flags/x/' + this.country.countryCode.toLowerCase() + '.gif';
        this.countryMapUrl = 'http://www.geonames.org/img/country/250/' + this.country.countryCode + '.png';

        this.neighbours = [];
        this.capitalCity = '';

        this.retrieveCapitalCity();
        this.retrieveNeighbours();
    };

    this.retrieveCapitalCity = function(){
        countryAppCapitalInfo(this.country.capital, this.country.countryCode)
            .then(this.processCitySuccess.bind(this), this.processError.bind(this));
    };

    this.trustAsSrc = function(src){
        console.log($sce);
        if(!src){
            return;
        }
        return $sce.trustAsResourceUrl(src);
    };


    this.processCitySuccess = function(response){
        this.capitalCity = response;
    };

    this.retrieveNeighbours = function(){
        countryAppNeighboursInfo(this.country.geonameId)
            .then(
                this.processNeighboursSuccess.bind(this),
                this.processError.bind(this)
            )
    };

    this.processNeighboursSuccess = function(response){
        if(response.length && Array.isArray(response)){
            this.neighbours = response;
        }
    };

    this.processError = function(error){
        console.log(error);
        alert('Unfortunately an error has occurred in retrieving the capital city. Please check the logs for more details.');
    };
    console.log('Resolving country');
    console.log(countryDetails);

    this.init(countryDetails);

}]);