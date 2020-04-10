angular
    .module('authController', [])
    .controller('AuthController', [
        '$scope',
        function($scope){
            $scope.tagline = 'Hello world - AuthController!';
        }
    ]);
