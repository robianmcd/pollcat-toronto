var mainCtrl = function($location, $rootScope) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        $location.path('/home');
    })
};
