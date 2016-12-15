var TestController = angular.module("TestController", ['ngCookies']);

TestController.controller('TestController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.user = null;
  $scope.fourQerr = null;

  $scope.quiz = {
    q1: false,
    q2: false,
    q3: false,
    q4: false
  }

  $scope.getCurrentUser = function(){
    $http.get('/users/find/current').then(function(response){
      var currentUser = response.data;
      $scope.user = currentUser;
    });
  };

  $scope.getCurrentUser();

  $scope.clickMe = function(){
    console.log($scope.quiz);
    var answers = $scope.quiz
    var score = 0;
    for(var key in answers){
      if(answers[key] === false){
        var num = key.split('').splice(1).join();
        var errMess = 'Sorry, you didn\'t answer Question #' + num;
        console.log(errMess);
        return $scope.fourQerr = errMess;
      } else {
        score += parseInt(answers[key]);
        $scope.fourQerr = null;
      }
    }
    console.log(score);
  };

}]);
