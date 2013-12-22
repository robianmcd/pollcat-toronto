var HomeCtrl = function($location, $filter, constants, voteCaWardFinder, userSession) {
    this.$location = $location;
    this.$filter = $filter;
    this.voteCaWardFinder = voteCaWardFinder;
    this.userSession = userSession;

    this.addressSearchErrorMessage = "";

    this.addressEntryEnum = {
        ENTER: 0,
        VERIFY: 1,
        LOADING_WARD: 2
    };

    this.addressEntryState = this.addressEntryEnum.ENTER;
    this.streetAddressInput = "";
    this.matchingStreetAddresses = [];
};

HomeCtrl.prototype.submitAddress = function() {
    var _this = this;
    this.addressSearchErrorMessage = "";

    this.voteCaWardFinder.getAddressSuggestions(this.streetAddressInput, function(addressSuggestions) {
        if (addressSuggestions.length === 0) {
            _this.addressSearchErrorMessage = "The address you entered could not be found :(";
        }
        else if (addressSuggestions.length === 1) {
            _this.goToWardInfo(addressSuggestions[0]);
        }
        else {
            _this.matchingStreetAddresses = addressSuggestions;
            _this.addressEntryState = _this.addressEntryEnum.VERIFY;
        }
    });
};

HomeCtrl.prototype.goToWardInfo = function(address) {
    var _this = this;

    this.addressEntryState = this.addressEntryEnum.LOADING_WARD;

    this.voteCaWardFinder.getWardInfo(address.lat, address.lng, function(wardInfo) {
        _this.userSession.setWard(wardInfo.ward);
        _this.$location.path('/ward/' + address.formattedAddress);
    });

};

HomeCtrl.prototype.enterNewAddress = function() {
    this.addressEntryState = this.addressEntryEnum.ENTER;
};