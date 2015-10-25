viewsModule.config(function($routeProvider){
    $routeProvider.when('countries', {
        templateUrl: './countries-list/coujntries-list.html',
        controller: 'CountriesListController as countriesList'
    })
}).controller('ContriesListController', function(){
    // countries code here

});