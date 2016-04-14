(function () {
    'use strict';

    var app= angular.module('app');
    app.controller('postAnswerController', postAnswerController);

    postAnswerController.$inject = ['homeService', '$rootScope','$cookieStore','flashService','$location'];
    function postAnswerController(homeService, $rootScope,$cookieStore,flashService,$location) {
        var vm = this;

        vm.user = null;
        var userName = $rootScope.globals.currentUser.username;
        var userid = $rootScope.globals.currentUser.userid;
        var api =  $rootScope.url;

        vm.postAnswer = postAnswer;
        vm.question = $cookieStore.get('question');
        var questionid = $cookieStore.get('questionId');
        initController();

        function initController() {
            homeService.getAnswers(api,questionid, function (response) {
                if (response.status == 200) {
                    vm.answers = response.data;
                } else {
                    flashService.error(response.msg);
                    vm.dataLoading = false;
                }
            });
        }
        function postAnswer()
        {
            vm.dataLoading = true;
                homeService.postAnswer(questionid,vm.answer, userName,userid,api)
                    .then(function (response) {
                        if (response.status == 200) {
                            flashService.success(response.msg, true);
                            vm.dataLoading = false;

                            vm.answer=null;
                            initController();
                           // $location.path('/');
                        } else {
                            flashService.error(response.msg);
                            vm.dataLoading = false;
                        }
                    });
        }
    }

})();