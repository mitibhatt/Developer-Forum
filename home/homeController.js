(function () {
    'use strict';

    var app= angular.module('app');
        app.controller('homeController', homeController);

    homeController.$inject = ['homeService', '$rootScope','$location','$cookieStore','flashService'];
    function homeController(homeService, $rootScope,$location,$cookieStore,flashService) {
        var vm = this;
        vm.getTag = getTag;
        vm.answer = answer;
        vm.getQuestions=getQuestions;
        var userName = $rootScope.globals.currentUser.username;
        var api =  $rootScope.url;
        initController();
        getQuestions();
        function initController() {
            vm.user = userName;
            homeService.getTags(api, function (response) {
                if (response.status == 200) {
                    vm.tags = response.info;
                    vm.ddlTag = response.info[0].tagId;
                    getQuestions();
                    $cookieStore.put('allTags', response.info);

                } else {
                    flashService.error(response.msg);
                    vm.dataLoading = false;
                }
            });
        }
        function getQuestions()
        {
            homeService.getQuestions(vm.ddlTag,api,function (response) {
                if (response.status == 200) {
                    vm.questions= response.data;
                } else {
                    flashService.error(response.msg);
                    vm.dataLoading = false;
                }

            });
        }
        function getTag(){
            $cookieStore.put('tagSelected', vm.ddlTag);
            $location.path('/postQuestion');
        }
        function answer (row)
        {
            $cookieStore.put('question',row.question);
            $cookieStore.put('questionId',row.questionId);
            $location.path('/postAnswer');
        }
    }
})();