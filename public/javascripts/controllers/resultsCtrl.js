var ResultsCtrl = function(constants, userSession) {
    this.constants = constants;
    this.userSession = userSession;

    this.activeNavItem = constants.navItemEnum.RESULTS;
    this.candidateTypeEnum = constants.candidateTypeEnum;

    this.questionData = userSession.getQuestionData();

    this.mayorList = [];
    this.councilorList = [];

    //TODO: setup mayorList and councilorList and pass them to the directive.


};