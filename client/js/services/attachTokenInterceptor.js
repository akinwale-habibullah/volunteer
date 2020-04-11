angular
    .module('attachTokenInterceptor', [])
    .factory('AttachTokens', [
        '$window',
        '$log',
        function($window, $log){
            // this is an $httpInterceptor
            // its job is to stop all out going request
            // then look in local storage and find the user's token
            var attach = {
                request: function(object){
                    var jwt;

                    try {
                        jwt = $window.localStorage.getItem('volunteer_token');
                    } catch (error) {
                        $log.info('attachTokenInterceptor couldn\'t retrieve volunteer_token from local storage', error);
                        return object;
                    }
                    
                    if(jwt) {
                        object.headers['x-access-token'] = jwt;
                    }

                    object.headers['Allow-Control-Allow-Origin'] = '*';
                    console.log('AttachTokens interceptor working!');
                    return object;
                }
            };
            return attach;
        }
    ]);
