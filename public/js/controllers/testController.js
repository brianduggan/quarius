var TestController = angular.module("TestController", ['ngCookies']);

TestController.controller('TestController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.user = null;
  $scope.fourQerr = null;
  $scope.fourQresults = null;

  $scope.quiz = {
    q1: false,
    q2: false,
    q3: false,
    q4: false
  }

  $scope.sample = {
    name: '',
    email: '',
    color: ''
  }

  $scope.getCurrentUser = function(){
    $http.get('/users/find/current').then(function(response){
      var currentUser = response.data;
      $scope.user = currentUser;
    });
  };

  $scope.getCurrentUser();

  $scope.submit4q = function(){
    console.log($scope.quiz);
    // scores test
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
    // gets color
    var color = '';
    if (score < 5) {
      color = 'Green';
    } else if (score === 5){
      color = 'Blue';
    } else if (score === 6){
      color = 'Gold';
    } else {
      color = 'Red';
    }
    $scope.sample.color = color;
    console.log('Your color is ' + color);
    console.log(score);
    console.log($scope.sample);
    //sends the info to db, then returns results
    $http.post('/sample', $scope.sample).then(function(res){
      console.log(res);
      var results = res;
      if (res.data.color === 'Green'){
        $scope.fourQresults = $scope.colors[0];
      }
    });
  };

}]);
