var VoteCtrl = function(constants, $routeParams, $location, userSession) {
    var _this = this;

    this.constants = constants;
    this.$location = $location;
    this.userSession = userSession;

    this.questionNum = parseInt($routeParams.questionNum);

    if ( !(this.questionNum >= 1 && this.questionNum <= this.constants.NUM_QUESTIONS) ) {
        this.$location.path('vote/1');
    }

    this.questionIndex = this.questionNum - 1;

    this.pageList = [];
    for (var i = 0; i < this.constants.NUM_QUESTIONS; i++) {
        this.pageList.push(
            {
                pageNum: i+1,
                isActivePage: (this.questionIndex === i)
            });
    }

    this.activeNavItem = this.constants.navItemEnum.VOTE;

    this.answerStateEnum = this.constants.answerStateEnum;
    this.candidateTypeEnum = this.constants.candidateTypeEnum;

    this.disagreeList = [];
    this.skipList = [];
    this.agreeList = [];

    this.answerState = userSession.getUserAnswers()[this.questionIndex];

    this.answerButtonGroupInfo = {};
    this.updateAnswerButtonGroupInfo();

    this.questionData = this.userSession.getQuestionData();
    this.activeQuestion = this.questionData.questionList[this.questionIndex];
    this.updateAnswerStateLists();

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
    this.userSession.setUserAnswer(this.questionIndex, this.answerState);
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
        this.disagreeList.push(this.questionData.candidateIdMap[curCandidateId].name);
    }

    for (i = 0; i < this.activeQuestion.absentCandidates.length; i++) {
        curCandidateId = this.activeQuestion.absentCandidates[i];
        this.skipList.push(this.questionData.candidateIdMap[curCandidateId].name);
    }

    for (i = 0; i < this.activeQuestion.agreeCandidates.length; i++) {
        curCandidateId = this.activeQuestion.agreeCandidates[i];
        this.agreeList.push(this.questionData.candidateIdMap[curCandidateId].name);
    }
};