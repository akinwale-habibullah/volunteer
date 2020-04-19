angular
    .module('appController', [])
    .controller('AppController', [
        '$scope',
        '$rootScope',
        'Auth',
        function($scope, $rootScope, Auth){
            $rootScope.hasSession = Auth.isAuthenticated();
            $scope.signout = function(){
                Auth.signout();
            }
        }
    ])