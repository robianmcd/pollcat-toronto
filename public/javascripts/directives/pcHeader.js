var pollCatModule = angular.module('PollCatApp');

pollCatModule.directive("pcHeader", function() {
    return {
        scope: {
            activeNavItem: '='
        },
        templateUrl: '/html/directives/pcHeader.html',
        controller: 'PcHeaderCtrl as ctrl'

    };
});

var PcHeaderCtrl = function($scope, $location, constants) {

    this.navItemEnum = constants.navItemEnum;
    this.pollCatProdUrl = constants.pollCatProdUrl;

    this.getActiveClass = function(pagesForNavItem) {
        var pageName = $location.path().split('/')[1];

        if ($.inArray(pageName, pagesForNavItem) !== -1) {
            return 'active';
        }
        else {
            return '';
        }
    };
};