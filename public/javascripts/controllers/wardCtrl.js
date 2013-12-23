var WardCtrl = function($routeParams, $location, userSession, constants) {
    this.$location = $location;
    this.userSession = userSession;
    this.constants = constants;

    this.address = $location.search().address;
    this.wardName = $location.search().wardName;
    this.wardNum = userSession.getWard();

    this.candidateMap = this.userSession.getCandidateMap();

    this.candidateNamesForMayor = [];
    this.candidateNamesForCouncilor = [];

    for(id in this.candidateMap) {
        if (this.candidateMap.hasOwnProperty(id)) {
            var candidateInfo = this.candidateMap[id];
            if (candidateInfo.type === this.constants.candidateTypeEnum.MAYOR) {
                this.candidateNamesForMayor.push(candidateInfo.name);
            }
            else if (candidateInfo.type === this.constants.candidateTypeEnum.COUNCILOR) {
                this.candidateNamesForCouncilor.push(candidateInfo.name);
            }
        }
    }
};

WardCtrl.prototype.next = function() {
    this.$location.url('/vote/1');
};

WardCtrl.prototype.previous = function() {
    this.$location.url('/home');
};