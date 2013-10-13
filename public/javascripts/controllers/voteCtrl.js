var VoteCtrl = function(constants, $routeParams, $location) {
    var _this = this;

    this.$location = $location;

    this.questionNum = parseInt($routeParams.questionNum);

    if ( !(this.questionNum >= 1 && this.questionNum <= 20) ) {
        this.$location.path('vote/1');
    }

    this.questionIndex = this.questionNum - 1;

    this.pageList = [];
    for (var i = 0; i < 20; i++) {
        this.pageList.push(
            {
                pageNum: i+1,
                isActivePage: (this.questionIndex === i)
            });
    }

    this.activeNavItem = constants.navItemEnum.VOTE;

    this.answerStateEnum = {
        UNSET: 0,
        AGREE: 1,
        SKIP: 2,
        DISAGREE: 3
    };

    this.disagreeList = [];
    this.skipList = [];
    this.agreeList = [];

    this.answerState = this.answerStateEnum.UNSET;

    this.answerButtonGroupInfo = {};
    this.updateAnswerButtonGroupInfo();

    this.getQuestionData(function(questionData) {
        _this.questionData = questionData;
        _this.activeQuestion = _this.questionData.questionList[_this.questionIndex];
    });

};

VoteCtrl.prototype.getQuestionData = function(callback) {
    //TODO: load this from the server
    var questionData = {
        candidateIdMap: {
            1: 'Rob Ford',
            4: 'Erica Downes',
            3: 'Greg Davis',
            7: 'Chris Onysko',
            13: 'Sam Richards',
            12: 'Robin Loyd',
            18: 'Steve French',
            9: 'Lee Done'
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

    callback(questionData);
};

VoteCtrl.prototype.updateAnswerButtonGroupInfo = function() {
    this.answerButtonGroupInfo[this.answerStateEnum.AGREE] = this.createAnswerButtonInfo(this.answerStateEnum.AGREE);
    this.answerButtonGroupInfo[this.answerStateEnum.SKIP] = this.createAnswerButtonInfo(this.answerStateEnum.SKIP);
    this.answerButtonGroupInfo[this.answerStateEnum.DISAGREE] = this.createAnswerButtonInfo(this.answerStateEnum.DISAGREE);
};

VoteCtrl.prototype.createAnswerButtonInfo = function(answerState) {
    return {
        buttonColorClass: this.getAnswerButtonColorClass(answerState)
    };
};

VoteCtrl.prototype.getAnswerButtonColorClass = function(buttonAnswerState) {
    if (this.answerState == this.answerStateEnum.UNSET) {
        return 'btn-white';
    }
    else if (this.answerState == buttonAnswerState) {
        return 'btn-grey';
    }
    else {
        return 'btn-light-grey';
    }
};

VoteCtrl.prototype.setAnswerState = function(newAnswerState) {
    this.answerState = newAnswerState;
    this.updateAnswerButtonGroupInfo();
    this.updateAnswerStateLists();
};

VoteCtrl.prototype.getHighlightAnswerButtonsClass = function() {
    if(this.answerState === this.answerStateEnum.UNSET) {
        return 'highlight';
    }
    else {
        return '';
    }
};

VoteCtrl.prototype.nextVotePage = function() {
    this.$location.path('vote/' + (this.questionNum + 1) );
};

VoteCtrl.prototype.previousVotePage = function() {
    this.$location.path('vote/' + (this.questionNum - 1) );
};

VoteCtrl.prototype.gotoVotePage = function(pageNum) {
    this.$location.path('vote/' + pageNum);
};

VoteCtrl.prototype.updateAnswerStateLists = function() {
    this.disagreeList = [];
    this.skipList = [];
    this.agreeList = [];

    if (this.answerState === this.answerStateEnum.DISAGREE) {
        this.disagreeList.push('You');
    }

    if (this.answerState === this.answerStateEnum.SKIP) {
        this.skipList.push('You');
    }

    if (this.answerState === this.answerStateEnum.AGREE) {
        this.agreeList.push('You');
    }

    var i;
    for (i = 0; i < this.activeQuestion.disagreeCandidates.length; i++) {
        curCandidateId = this.activeQuestion.disagreeCandidates[i];
        this.disagreeList.push(this.questionData.candidateIdMap[curCandidateId]);
    }

    for (i = 0; i < this.activeQuestion.absentCandidates.length; i++) {
        curCandidateId = this.activeQuestion.absentCandidates[i];
        this.skipList.push(this.questionData.candidateIdMap[curCandidateId]);
    }

    for (i = 0; i < this.activeQuestion.agreeCandidates.length; i++) {
        curCandidateId = this.activeQuestion.agreeCandidates[i];
        this.agreeList.push(this.questionData.candidateIdMap[curCandidateId]);
    }
};