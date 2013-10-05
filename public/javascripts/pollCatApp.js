var pollCatModule = angular.module('PollCatApp', ['ngRoute']);

pollCatModule.config([
    '$routeProvider',
    function (routeProvider) {
        routeProvider.when('/home', {
            templateUrl: '/html/views/home.html',
            controller: 'HomeCtrl as ctrl'
        })
        .when('/vote', {
            templateUrl: '/html/views/vote.html',
            controller: 'VoteCtrl as ctrl'
        })
        .when('/results', {
            templateUrl: '/html/views/results.html',
            controller: 'ResultsCtrl as ctrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }]);
