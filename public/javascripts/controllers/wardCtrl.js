var WardCtrl = function($routeParams, $location, userSession) {
    this.$location = $location;
    this.address = $routeParams.address;
    this.wardNum = userSession.getWard();

    if (this.wardNum === undefined) {
        this.$location.path('/home');
    }
};

WardCtrl.prototype.startVoting = function() {
    this.$location.path('/vote/1');
};