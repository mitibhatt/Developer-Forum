(function () {
    'use strict';

    var app = angular.module('app');
        app.factory('userService', userService) ;

   // UserService.$inject = ['$http'];
    function userService($http) {
        var service = {};
        service.createUser = createUser;

        return service;

        function createUser(username,email,password,api) {
            var config = {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};
            var data = "userName="+username+"&email="+email+"&pwd="+password;
            return $http.post(api+'signup.php',data,config).then(handleSuccess, handleError('Error creating user'));

        }
        function handleSuccess(res) {
            return res.data;
        }
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
