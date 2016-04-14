(function () {
    'use strict';

   var app =  angular.module('app');
   app.controller('registerController', registerController);

    registerController.$inject = ['userService', '$location', '$rootScope', 'flashService'];
    function registerController(userService, $location, $rootScope, flashService) {
        var vm = this;
        var api =  $rootScope.url;
        vm.register = register;

        function register() {
            vm.dataLoading = true;
            if (vm.password == vm.cPassword) {
                userService.createUser(vm.username, vm.email, vm.password,api)
                    .then(function (response) {
                        if (response.status == 200) {
                            flashService.success('Registration successful', true);
                            $location.path('/login');
                        } else {
                            flashService.error(response.msg);
                            vm.dataLoading = false;
                        }
                    });
            }
            else
            {
                flashService.error("Password and confirm password do not match");
                vm.dataLoading = false;
            }
        }
    }

})();
