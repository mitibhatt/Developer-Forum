(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngCookies']);
    app.config(config)
    app.run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                controller: 'homeController',
                templateUrl: 'home/home.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'loginController',
                templateUrl: 'login/login.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'registerController',
                templateUrl: 'register/register.html',
                controllerAs: 'vm'
            })
            .when('/postQuestion', {
                controller: 'postQuestionController',
                templateUrl: 'postQuestion/postQuestion.html',
                controllerAs: 'vm'
            })
            .when('/postAnswer', {
                controller: 'postAnswerController',
                templateUrl: 'postAnswer/postAnswer.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.url = "http://192.168.1.8:8888/testconnection/";

        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();