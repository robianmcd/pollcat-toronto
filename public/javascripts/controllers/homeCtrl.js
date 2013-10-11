var HomeCtrl = function(constants, $location) {
    this.$location = $location;

    this.activeNavItem = constants.navItemEnum.HOME;
};

HomeCtrl.prototype.startVoting = function() {
    this.$location.path('/vote/1');
};