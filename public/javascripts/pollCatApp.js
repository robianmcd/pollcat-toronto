var pollCatModule = angular.module('PollCatApp', ['ngRoute']);

pollCatModule.config([
    '$routeProvider',
    function (routeProvider) {
        routeProvider.when('/home', {
            templateUrl: '/html/views/home.html',
            controller: 'HomeCtrl as ctrl'
        });
        routeProvider.otherwise({
            redirectTo: '/home'
        });
    }]);