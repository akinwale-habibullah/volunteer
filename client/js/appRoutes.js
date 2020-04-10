angular
    .module('appRoutes', [])
    .config([
        '$routeProvider',
        '$httpProvider',
        function($routeProvider, $httpProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController'
                })
                .when('/signup', {
                    templateUrl: 'views/signup.html',
                    controller: 'AuthController'
                })
                .when('/login', {
                    templateUrl: 'views/signin.html',
                    controller: 'AuthController'
                })
                .when('/users/:userid/profile', {
                    templateUrl: 'views/profile.html',
                    controller: 'UserController',
                    authenticate: true
                })
                .otherwise({
                    redirectTo: "/"
                });

                /**
                 * Other routes
                 */
                
                // .when('/jobs', {
                //     templateUrl: 'views/jobs.html',
                //     controller: 'JobsController'
                // })
                // .when('/jobs/:jobid', {
                //     templateUrl: 'views/job.html',
                //     controller: 'JobsController',
                //     authenticate: true
                // })
                // .when('/jobs/:jobid/applications', {
                //     templateUrl: 'views/jobs.html',
                //     controller: 'JobsController',
                //     authenticate: true
                // })
                // .when('/applications/:applicationid', {
                //     templateUrl: 'views/application.html',
                //     controller: 'ApplicationsController',
                //     authenticate: true
                // })
                // .when('/applications/:applicationid/edit', {
                //     templateUrl: 'views/edit-application.html',
                //     controller: 'ApplicationsController',
                //     authenticate: true
                // })
                

            $httpProvider.interceptors.push('AttachTokens');
        }
    ]);