var pollCatModule = angular.module('PollCatApp');

pollCatModule.directive("listPanel", function() {
    return {
        scope: {
            panelTitle: '@',
            list: '='
        },
        templateUrl: '/html/directives/listPanel.html'

    };
});