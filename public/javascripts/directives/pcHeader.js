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

var PcHeaderCtrl = function($scope, constants) {
    this.navItemEnum = constants.navItemEnum;

    this.getActiveClass = function(navItem) {
        if (navItem === $scope.activeNavItem) {
            return 'active';
        }
        else {
            return '';
        }
    };
};