angular.module('volunteer', [
    'ngRoute',
    'attachTokenInterceptor',
    'authService',
    'authController',
    'homeController',
    'userController',
    'appController',
    'appRoutes'
]);