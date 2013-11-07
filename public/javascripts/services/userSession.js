var pollCatModule = angular.module('PollCatApp');
pollCatModule.factory('userSession', function($cookieStore, $log, $q, constants) {return new UserSession($cookieStore, $log, $q, constants);});

var UserSession = function($cookieStore, $log, $q, constants) {
    this.$cookieStore = $cookieStore;
    this.constants = constants;
    this.$log = $log;
    this.$q = $q;

    this.USER_ANSWERS_KEY = 'userAnswers';
    this.QUESTION_DATA_KEY = 'questionData';
    this.candidateTypeEnum = this.constants.candidateTypeEnum;

};

UserSession.prototype.promiseToHaveQuestionData = function() {
    if (this.$cookieStore.get(this.QUESTION_DATA_KEY) === undefined) {
        //TODO: load this from the server and return an http promise. Also we should handel the case where
        // the http request fails. see this video for more info on how to do that:
        // http://egghead.io/lessons/angularjs-resolve-routechangeerror
        var questionData = {
            candidateIdMap: {
                1: {name: 'Rob Ford', type: this.candidateTypeEnum.MAYOR},
                4: {name: 'Erica Downes', type: this.candidateTypeEnum.MAYOR},
                3: {name: 'Greg Davis', type: this.candidateTypeEnum.MAYOR},
                7: {name: 'Chris Onysko', type: this.candidateTypeEnum.MAYOR},
                13: {name: 'Sam Richards', type: this.candidateTypeEnum.COUNCILOR},
                12: {name: 'Robin Loyd', type: this.candidateTypeEnum.COUNCILOR},
                18: {name: 'Steve French', type: this.candidateTypeEnum.COUNCILOR},
                9: {name: 'Lee Done', type: this.candidateTypeEnum.COUNCILOR}
            },
            questionList: [
                {
                    title: "Remove bike lanes from College St",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam",
                    agreeCandidates: [1, 4, 3, 9],
                    absentCandidates: [7, 13],
                    disagreeCandidates: [18, 9],
                    numAgree: 22,
                    numAbsent: 4,
                    numDisagree: 15,
                    averageAgreePercent: 0.6453
                },
                {
                    title: "Shark fin soup should be banned",
                    description: "Nulla quam velit. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam",
                    agreeCandidates: [1, 4, 3, 9, 18, 13],
                    absentCandidates: [12],
                    disagreeCandidates: [7],
                    numAgree: 36,
                    numAbsent: 2,
                    numDisagree: 7,
                    averageAgreePercent: 0.831
                },
                {
                    title: "Remove bike lanes from College St",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam",
                    agreeCandidates: [1, 4, 3, 12],
                    absentCandidates: [7, 13],
                    disagreeCandidates: [18, 9],
                    numAgree: 22,
                    numAbsent: 4,
                    numDisagree: 15,
                    averageAgreePercent: 0.6453
                }
            ]
        };
        this.$cookieStore.put(this.QUESTION_DATA_KEY, questionData);
        var defer = this.$q.defer();
        defer.resolve();
        return defer.promise;

    } else {
        var defer = this.$q.defer();
        defer.resolve();
        return defer.promise;
    }
};

UserSession.prototype.getQuestionData = function() {
    return this.$cookieStore.get(this.QUESTION_DATA_KEY);
};

UserSession.prototype.getUserAnswers = function() {
    var userAnswers = this.$cookieStore.get(this.USER_ANSWERS_KEY);
    if (userAnswers === undefined) {
        userAnswers = this._getDefaultUserAnswers();
    }

    return userAnswers;
};

UserSession.prototype.setUserAnswer = function(answerIndex, answer) {
    var userAnswers = this.getUserAnswers();
    userAnswers[answerIndex] = answer;

    this.$cookieStore.put(this.USER_ANSWERS_KEY, userAnswers);
};

UserSession.prototype._getDefaultUserAnswers = function() {
    var userAnswers = [];

    for(var i = 0; i < this.constants.NUM_QUESTIONS; i++) {
        userAnswers.push(this.constants.answerStateEnum.UNSET);
    }

    return userAnswers;
};