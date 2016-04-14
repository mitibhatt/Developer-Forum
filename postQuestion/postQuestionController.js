(function () {
    'use strict';

    var app= angular.module('app');
    app.controller('postQuestionController', postQuestionController);

    postQuestionController.$inject = ['homeService', '$rootScope','$cookieStore','flashService','$location'];
    function postQuestionController(homeService, $rootScope,$cookieStore,flashService,$location) {
        var vm = this;

        vm.user = null;
        var userName = $rootScope.globals.currentUser.username;
        var userid = $rootScope.globals.currentUser.userid;
        var api =  $rootScope.url;
        vm.tags =  $cookieStore.get('allTags');
       vm.ddlTag=  $cookieStore.get('tagSelected');
        vm.postQuestion = postQuestion;
        function postQuestion()
        {
            vm.dataLoading = true;
            if (vm.password == vm.cPassword) {
                homeService.postQuestion(vm.ddlTag,vm.question, userName,userid,api)
                    .then(function (response) {
                        if (response.status == 200) {
                            flashService.success(response.msg, true);
                            $location.path('/');
                        } else {
                            flashService.error(response.msg);
                            vm.dataLoading = false;
                        }
                    });
            }
        }
    }
})();