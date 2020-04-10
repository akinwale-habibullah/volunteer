angular
    .module('authService', [])
    .factory('Auth', [
        '$http',
        '$location',
        '$window',
        function ($http, $location, $window) {
            var signin = function (user) {
                return $http.post('/api/signin', JSON.stringify(user)).then(function (response) {
                    return response.data;
                }, function (err) { console.log('Error in AuthService signin: '); });
            }

            var signup = function (user) {
                return $http.post('/api/signup', JSON.stringify(user)).then(function (response) {
                    return response.data;
                }, function (err) { console.log('Error in AuthService signup: '); });
            };

            var isAuthenticated = function () {
                // check local to see if token exists
                // going by name volunteer for time being
                return !!$window.localStorage.getItem("volunteer_token")
            };

            var signout = function () {
                $window.localStorage.removeItem('volunteer_token');
                $window.localStorage.removeItem('volunteer_user')
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