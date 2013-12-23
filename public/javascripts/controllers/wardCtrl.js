var WardCtrl = function($routeParams, $location, userSession) {
    this.$location = $location;
    this.address = $location.search().address;
    this.wardNum = $location.search().wardName;

    //Redirect to home page if the ward cookie is missing.
    if (userSession.getWard() === undefined) {
        this.$location.path('/home');
    }
};

WardCtrl.prototype.startVoting = function() {
    this.$location.path('/vote/1');
};