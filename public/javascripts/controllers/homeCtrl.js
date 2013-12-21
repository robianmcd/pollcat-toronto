var HomeCtrl = function($location, constants, voteCaWardFinder) {
    this.$location = $location;
    this.voteCaWardFinder = voteCaWardFinder;

    this.addressEntryEnum = {
        ENTER: 0,
        VERIFY: 1,
        LOADING_WARD: 2
    };

    this.addressEntryState = this.addressEntryEnum.ENTER;
    this.streetAddressInput = "";
    this.matchingStreetAddresses = [];
};

HomeCtrl.prototype.startVoting = function() {
    var _this = this;

    this.voteCaWardFinder.getAddressSuggestions(this.streetAddressInput, function(addressSuggestions) {
        _this.matchingStreetAddresses = addressSuggestions;
        _this.addressEntryState = _this.addressEntryEnum.VERIFY;

    });
};

HomeCtrl.prototype.goToWardInfo = function(address) {
    this.addressEntryState = this.addressEntryEnum.LOADING_WARD;
    this.$location.path('/vote/1');
};