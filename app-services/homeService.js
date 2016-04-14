(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('homeService', homeService) ;

    function homeService($http) {
        var service = {};
        service.getTags = getTags;
        service.postQuestion = postQuestion;
        service.getQuestions = getQuestions;
        service.postAnswer = postAnswer;
        service.getAnswers=getAnswers;
        return service;

        function getTags(api,callback) {
        
            return $http.get(api+'getTags.php').success(function (response) {
                callback(response);
            });

        }
        function postQuestion(tagid,question,username,userid,api){
            var config = {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};
            var data = "tagId="+tagid+"&questionDescription="+question+"&userName="+username+"&userId="+userid;
            return $http.post(api+'createQuestion.php',data,config).then(handleSuccess, handleError('Error creating user'));

        }
        function postAnswer(qid,answer,username,userid,api){
            var config = {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};
            var data = "questionId="+qid+"&answerValue="+answer+"&userName="+username+"&userId="+userid;
            return $http.post(api+'postAnswer.php',data,config).then(handleSuccess, handleError('Error creating user'));

        }
        function getAnswers(api,questionid,callback)
        {
            {
                return $http.get(api+'getAnswers.php?questionId='+questionid).success(function (response) {
                    callback(response);
                });
            }
        }
        function getQuestions(tagid,api,callback)
        {
            return $http.get(api+'getQuestions.php?tagId='+tagid).success(function (response) {
                callback(response);
            });
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