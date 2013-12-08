var pollCatModule = angular.module('PollCatApp');
pollCatModule.factory('userSession', function($cookieStore, $log, $q, $http, constants) {
    return new UserSession($cookieStore, $log, $q, $http, constants);
});

var UserSession = function($cookieStore, $log, $q, $http, constants) {
    this.$cookieStore = $cookieStore;
    this.constants = constants;
    this.$log = $log;
    this.$q = $q;
    this.$http = $http;

    this.USER_ANSWERS_KEY = 'userAnswers';
    this.QUESTION_LIST_KEY = 'questionList';
    this.CANDIDATE_MAP_KEY = 'candidateMap';
    this.candidateTypeEnum = this.constants.candidateTypeEnum;


    this.questionList = null;
    this.candidateMap = null;
};

UserSession.prototype.promiseToHaveCandidateMap = function() {
    var _this = this;

    if (this.candidateMap === null) {
        //TODO: get ward from cookie?

        return this.$http.get('/api/candidates/1')
            .success(function(data) {
                _this.candidateMap = {};

                //Convert the array into a map with ids as keys.
                for (var i = 0; i < data.length; i++) {
                    _this.candidateMap[data[i]._id] = data[i];
                }
            });
    } else {
        var defer = this.$q.defer();
        defer.resolve();
        return defer.promise;
    }
};

UserSession.prototype.promiseToHaveQuestionList = function() {
    var _this = this;

    if (this.questionList === null) {
        //TODO: handel the case where the http request fails. see this video for more info on how to do that:
        // http://egghead.io/lessons/angularjs-resolve-routechangeerror
        return this.$http.get('/api/questions')
            .success(function(data) {
                _this.questionList = data;
            });
    } else {
        var defer = this.$q.defer();
        defer.resolve();
        return defer.promise;
    }
};

/*
 {
 1: {name: 'Rob Ford', type: candidateTypeEnum.MAYOR},
 4: {name: 'Erica Downes', type: candidateTypeEnum.MAYOR},
 3: {name: 'Greg Davis', type: candidateTypeEnum.MAYOR},
 7: {name: 'Chris Onysko', type: candidateTypeEnum.MAYOR},
 13: {name: 'Sam Richards', type: candidateTypeEnum.COUNCILOR},
 12: {name: 'Robin Loyd', type: candidateTypeEnum.COUNCILOR},
 18: {name: 'Steve French', type: candidateTypeEnum.COUNCILOR},
 9: {name: 'Lee Done', type: candidateTypeEnum.COUNCILOR}
 }
 */
UserSession.prototype.getCandidateMap = function() {
    return this.candidateMap;
};


/*
 [
 {
 title: "Remove bike lanes from College St",
 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam",
 agreeCandidates: [1, 4, 3, 9],
 absentCandidates: [7, 13],
 disagreeCandidates: [18, 12],
 numAgree: 22,
 numAbsent: 4,
 numDisagree: 15
 },
 {
 title: "Shark fin soup should be banned",
 description: "Nulla quam velit. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam",
 agreeCandidates: [1, 4, 3, 9, 18, 13],
 absentCandidates: [12],
 disagreeCandidates: [7],
 numAgree: 36,
 numAbsent: 2,
 numDisagree: 7
 },
 {
 title: "Remove bike lanes from College St",
 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam",
 agreeCandidates: [1, 4, 3, 12],
 absentCandidates: [7, 13],
 disagreeCandidates: [18, 9],
 numAgree: 22,
 numAbsent: 4,
 numDisagree: 15
 }
 ]
 */
UserSession.prototype.getQuestionList = function() {
    return this.questionList;
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

    for (var i = 0; i < this.getQuestionList().length; i++) {
        userAnswers.push(this.constants.answerStateEnum.UNSET);
    }

    return userAnswers;
};