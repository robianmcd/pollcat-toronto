var pollCatModule = angular.module('PollCatApp', ['ngRoute', 'ngCookies']);

pollCatModule.config([
    '$routeProvider',
    function(routeProvider) {
        routeProvider
            .when('/home', {
                templateUrl: '/html/views/home.html',
                controller: 'HomeCtrl as ctrl'
            })
            .when('/ward', {
                templateUrl: '/html/views/ward.html',
                controller: 'WardCtrl as ctrl',
                resolve: {
                    loadCandidateData: loadCandidateData
                }
            })
            .when('/vote/:questionNum', {
                templateUrl: '/html/views/vote.html',
                controller: 'VoteCtrl as ctrl',
                resolve: {
                    loadCandidateData: loadCandidateData,
                    loadQuestionData: loadQuestionData
                }
            })
            .when('/results', {
                templateUrl: '/html/views/results.html',
                controller: 'ResultsCtrl as ctrl',
                resolve: {
                    loadCandidateData: loadCandidateData,
                    loadQuestionData: loadQuestionData
                }
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
]);

var loadQuestionData = function(userSession) {
    return userSession.promiseToHaveQuestionList();
};

var loadCandidateData = function(userSession) {
    return userSession.promiseToHaveCandidateMap();
};