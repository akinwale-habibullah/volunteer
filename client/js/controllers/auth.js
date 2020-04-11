angular
    .module('authController', [])
    .controller('AuthController', [
        '$scope',
        '$window',
        '$location',
        '$log',
        'Auth',
        function($scope, $window, $location, $log, Auth){
            $scope.login = function() {
                Auth.signin($scope.user).then(function(response){
                    $log.info('signin response from backend: ', response);

                    $window.localStorage.setItem('volunteer_token', response.token);
                    $window.localStorage.setItem('volunteer_userid', response.userid);
                    $location.path('/users/' + response.userid + '/profile');
                }, function(err){
                    $log.info('Login unsuccessful: ', err);
                });
            };
            $scope.signup = function(){
                $log.info($scope.user);
            }
        }
    ]);
