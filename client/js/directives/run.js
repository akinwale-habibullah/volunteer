angular
    .module('runDirective', []).run(function($rootScope, $location, Auth){
        $rootScope.$on('$routeChangeStart', function(event, next, current){
            //  console.log("NEXT: ", next);
            if(next.$$route && next.$$route.authenticate && !Auth.isAuthenticated()){
                $location.path('/signin');
            }
            $rootScope.hasSession = Auth.isAuthenticated();
        });
        console.log('Run directive that manages authentication');
    });