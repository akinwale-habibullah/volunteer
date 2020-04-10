angular
    .module('userController', [])
    .controller('UserController', [
        '$scope',
        function($scope) {
            $scope.message = 'UserController $scope message!';
        }
    ]);
