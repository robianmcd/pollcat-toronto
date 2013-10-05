var pollCatModule = angular.module('PollCatApp');
pollCatModule.factory('constants', function() {return new Constants();});

var Constants = function() {
    this.navItemEnum = {
        HOME: 0,
        VOTE: 1,
        RESULTS: 2
    };
};