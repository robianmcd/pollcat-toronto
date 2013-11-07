var pollCatModule = angular.module('PollCatApp', ['ngRoute', 'ngCookies']);

pollCatModule.config([
    '$routeProvider',
    function (routeProvider) {
        routeProvider.when('/home', {
            templateUrl: '/html/views/home.html',
            controller: 'HomeCtrl as ctrl'
        })
        .when('/vote/:questionNum', {
            templateUrl: '/html/views/vote.html',
            controller: 'VoteCtrl as ctrl',
            resolve: {
                loadQuestionData: loadQuestionData
            }
        })
        .when('/results', {
            templateUrl: '/html/views/results.html',
            controller: 'ResultsCtrl as ctrl',
            resolve: {
                loadQuestionData: loadQuestionData
            }
        })
        .otherwise({
            redirectTo: '/home'
        });
    }
]);

var loadQuestionData = function(userSession) {
    return userSession.promiseToHaveQuestionData();
};
