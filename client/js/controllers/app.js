angular
    .module('appController', [])
    .controller('AppController', [
        '$scope',
        function($scope){
            $scope.message = 'appController $scope item';
        }
    ])