var HomeCtrl = function(constants, $location) {
    this.$location = $location;
};

HomeCtrl.prototype.startVoting = function() {
    this.$location.path('/vote/1');
};