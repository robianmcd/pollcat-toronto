var pollCatModule = angular.module('PollCatApp');
pollCatModule.service('voteCaWardFinder', function($filter, $rootScope, $http) {
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
                //Filters out records that are not street addresses or are not in the toronto Bounds
                var matchingGoogleMapsAddresses = $filter('filter')(results, function(match) {
                    var curLocation = new google.maps.LatLng(match.geometry.location.nb, match.geometry.location.ob);

                    return ($.inArray('street_address', match.types) !== -1) &&
                        _this.torontoBounds.contains(curLocation);
                });

                var matchingAddresses = $.map(matchingGoogleMapsAddresses, function(address) {
                    return {
                        formattedAddress: address.formatted_address,
                        lat: address.geometry.location.nb,
                        lng: address.geometry.location.ob
                    };
                });

                callback(matchingAddresses);
                $rootScope.$apply();
            });
    };

    this.getWardInfo = function(lat, lng, callback) {
        $http.jsonp('http://api.vote.ca/api/beta/districts?lat=' + lat + '&lng=' + lng + '&callback=JSON_CALLBACK')
            .success(function(data) {
                var municipalWardInfoList = $filter('filter')(data, function(wardInfo) {
                    return wardInfo.electoral_group.level.toLowerCase() === "municipal";
                });

                //There should only ever be 1 record for municipal ward info.
                var municipalWardInfo = municipalWardInfoList[0];

                callback({
                    ward: parseInt(municipalWardInfo.source_id, 10),
                    name: municipalWardInfo.name
                });
            });
    };

});