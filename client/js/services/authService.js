angular
    .module('authService', [])
    .factory('Auth', [
        '$http',
        '$location',
        '$window',
        '$log',
        function ($http, $location, $window, $log) {
            var signin = function (user) {
                return $http.post('/api/v1/auth/signin', JSON.stringify(user)).then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.data;
                });
            };

            var signup = function (user) {
                return $http.post('/api/v1/auth/signup', JSON.stringify(user)).then(function (response) {
                    $log.info(response.data);

                    return response.data;
                }, function (err) { $log.info('Error in AuthService signup: '); });
            };

            var isAuthenticated = function () {
                // check local to see if token exists
                // going by name volunteer_token for time being
                return !!$window.localStorage.getItem("volunteer_token");
            };

            var signout = function () {
                $window.localStorage.removeItem('volunteer_token');
                $window.localStorage.removeItem('volunteer_userid')
                $location.path('/');
            };

            return {
                signin,
                signup,
                isAuthenticated,
                signout
            }

        }
    ]);