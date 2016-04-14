(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$location', 'authenticationService', 'flashService','$rootScope'];
    function loginController($location, authenticationService, flashService,$rootScope) {
        var vm = this;
        var api =  $rootScope.url;
        vm.login = login;
        (function initController() {
            // reset login status
            flashService.initService();
            authenticationService.clearCredentials();
        })();
        function login() {
            vm.dataLoading = true;
            authenticationService.login(vm.email, vm.password,api, function (response) {
                if (response.status == 200) {
                    authenticationService.setCredentials(response.userName, vm.password,response.userId);
                    $rootScope.globals.currentUser.username= response.userName;
                    $location.path('/');
                } else {
                    flashService.error(response.msg);
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
