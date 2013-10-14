var pollCatModule = angular.module('PollCatApp');
pollCatModule.factory('userSession', function($cookieStore, constants) {return new UserSession($cookieStore, constants);});

var UserSession = function($cookieStore, constants) {
    this.$cookieStore = $cookieStore;
    this.constants = constants;

    this.USER_ANSWERS_KEY = 'userAnswers';
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