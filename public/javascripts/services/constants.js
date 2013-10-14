var pollCatModule = angular.module('PollCatApp');
pollCatModule.factory('constants', function() {return new Constants();});

var Constants = function() {
    this.navItemEnum = {
        HOME: 0,
        VOTE: 1,
        RESULTS: 2
    };

    this.answerStateEnum = {
        UNSET: 0,
        AGREE: 1,
        SKIP: 2,
        DISAGREE: 3
    };

    this.NUM_QUESTIONS = 20;
};