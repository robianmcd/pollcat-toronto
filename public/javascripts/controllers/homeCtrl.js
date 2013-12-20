var HomeCtrl = function(constants, $location, voteCaWardFinder) {
    this.$location = $location;
    this.voteCaWardFinder = voteCaWardFinder;

    this.streetAddress = "";
};

HomeCtrl.prototype.startVoting = function() {
    var _this = this;

    this.voteCaWardFinder.getAddressSuggestions(this.streetAddress, function(addressSuggestions) {
        //_this.$location.path('/vote/1');
    });
};