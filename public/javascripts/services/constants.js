var pollCatModule = angular.module('PollCatApp');
pollCatModule.factory('constants', function() {
    return new Constants();
});

var Constants = function() {
    this.navItemEnum = {
        HOME: ['home', 'contact'],
        VOTE: ['vote', 'ward'],
        RESULTS: ['results']
    };

    this.answerStateEnum = {
        UNSET: 0,
        AGREE: 1,
        SKIP: 2,
        DISAGREE: 3
    };

    this.candidateTypeEnum = {
        MAYOR: 0,
        COUNCILOR: 1
    };

    this.primaryColor = {
        hue: 207,
        saturation: 67,
        value: 79,
        hex: "#428BCA"
    };

    this.pollCatProdUrl = 'http://pollcat-toronto.herokuapp.com/';
};