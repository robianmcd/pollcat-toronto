var pollCatModule = angular.module('PollCatApp');
pollCatModule.service('voteCaWardFinder', function($filter) {
    var _this = this;

    //These latitude and longitude are approximate values that should bound the city of toronto.
    this.torontoSouthWest = new google.maps.LatLng(43.572680, -79.622841);
    this.torontoNorthEast = new google.maps.LatLng(43.860772, -79.105396);
    this.torontoBounds = new google.maps.LatLngBounds(this.torontoSouthWest, this.torontoNorthEast);

    this.getAddressSuggestions = function(streetAddress, callback) {
        var geocoder = new google.maps.Geocoder();

        //The heuristic adds "Toronto" and "Canada" to the streetAddress if they don't already exist to yeild better
        //results from google's geocoder.

        if (streetAddress.toLowerCase().indexOf("toronto") === -1) {
            streetAddress += " Toronto";
        }
        if (streetAddress.toLowerCase().indexOf("canada") === -1) {
            streetAddress += " Canada";
        }

        geocoder.geocode(
            {'address': streetAddress, 'region': 'CA', bounds: this.torontoBounds},
            function(results, status) {
                console.log(results);
                console.log(status);

                //Filters out records that are not street addresses or are not in the toronto Bounds
                var matchingAddresses = $filter('filter')(results, function(match) {
                    var curLocation = new google.maps.LatLng(match.geometry.location.nb, match.geometry.location.ob);

                    return $.inArray(match.types, 'street_address') && _this.torontoBounds.contains(curLocation);
                });

                callback(matchingAddresses);

                console.log(matchingAddresses);
            });


    }
});