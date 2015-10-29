viewsModule.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: './home/home.html',
        controller: 'HomeCtrl as homeControl'
    })
}).controller('HomeCtrl', function(){
    this.instructions = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat sit amet sapien quis varius. Curabitur blandit lectus ut elit volutpat egestas. Etiam condimentum eu felis vel cursus.';
    this.browseCategoriesButton = 'Browse Countries';
});