var pollCatModule = angular.module('PollCatApp');

pollCatModule.directive("pcFooter", function() {
    return {
        templateUrl: '/html/directives/pcFooter.html',
        controller: 'pcFooterCtrl as ctrl'
    };
});

var pcFooterCtrl = function() {

};