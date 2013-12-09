var ResultsCtrl = function($log, $location, constants, userSession) {
    this.$log = $log;
    this.$location = $location;
    this.constants = constants;
    this.userSession = userSession;

    this.candidateTypeEnum = constants.candidateTypeEnum;
    this.answerStateEnum = constants.answerStateEnum;

    this.userAnswers = userSession.getUserAnswers();
    this.questionList = userSession.getQuestionList();
    this.candidateMap = userSession.getCandidateMap();

    this.mayorList = [];
    this.councilorList = [];

    //TODO: setup mayorList and councilorList and pass them to the directive.

    var candidateIdMap = $.extend({}, this.candidateMap);
    var id;
    for (id in candidateIdMap) {
        if (candidateIdMap.hasOwnProperty(id)) {
            candidateIdMap[id].scoreSum = 0;
            candidateIdMap[id].score = 0;
        }
    }

    var numAnswersSetByUser = 0;

    for (var questionIndex = 0; questionIndex < this.userAnswers.length; questionIndex++) {

        var curQuestion = this.questionList[questionIndex];
        var sameAnswerAsUserCandidatesList;
        switch (this.userAnswers[questionIndex]) {
            case this.answerStateEnum.UNSET:
            case this.answerStateEnum.SKIP:
                continue;
            case this.answerStateEnum.AGREE:
                sameAnswerAsUserCandidatesList = curQuestion.agreeCandidates;
                break;
            case this.answerStateEnum.DISAGREE:
                sameAnswerAsUserCandidatesList = curQuestion.disagreeCandidates;
                break;
        }

        numAnswersSetByUser++;


        for (var i = 0; i < sameAnswerAsUserCandidatesList.length; i++) {
            var curCandidateId = sameAnswerAsUserCandidatesList[i];
            //TODO: This probably shouldn't be necessary. Maybe the server should only return candidates for the given ward instead of all of them.
            if (candidateIdMap[curCandidateId] !== undefined) {
                candidateIdMap[curCandidateId].scoreSum++;
            }

        }
    }

    if (numAnswersSetByUser === 0) {
        //The user hasn't set any answers...
        //TODO: maybe we should redirect them to the vote page.
    } else {
        for (id in candidateIdMap) {
            if (candidateIdMap.hasOwnProperty(id)) {
                var curCandidateInfo = candidateIdMap[id];
                var destList;
                if (curCandidateInfo.type === this.candidateTypeEnum.MAYOR) {
                    destList = this.mayorList;
                }
                else if (curCandidateInfo.type === this.candidateTypeEnum.COUNCILOR) {
                    destList = this.councilorList;
                }

                destList.push({name: curCandidateInfo.name, id: id, score: curCandidateInfo.scoreSum / numAnswersSetByUser});
            }
        }

        this.mayorList.sort(function(a, b) {
            return b.score - a.score;
        });
        this.councilorList.sort(function(a, b) {
            return b.score - a.score;
        });
    }

};

ResultsCtrl.prototype.reviewVotes = function() {
    this.$location.path('/vote/1');
};