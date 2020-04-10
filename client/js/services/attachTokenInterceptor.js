angular
    .module('attachTokenInterceptor', [])
    .factory('AttachTokens', [
        '$window',
        function($window){
            // this is an $httpInterceptor
            // its job is to stop all out going request
            // then look in local storage and find the user's token
            var attach = {
                request: function(object){
                    // var jwt = $window.localstorage.getItem('volunteer_token');
                    // if(jwt) {
                    //     object.headers['x-access-token'] = jwt;
                    // }

                    // object.headers['Allow-Control-Allow-Origin'] = '*';
                    console.log('AttachTokens interceptor working!');
                    return object;
                }
            };
            return attach;
        }
    ]
)
