angular
    // main app controller, not inside a ng-view, handles signout
    .module('homeController', []).controller('HomeController', [
        '$scope',
        function($scope){
            $scope.jobs = [1,2,3,4,5];
        }
    ]);
