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
    colorSet: {}
  }

  $scope.getCurrentUser = function(){
    $http.get('/users/find/current').then(function(response){
      var currentUser = response.data;
      $scope.user = currentUser;
    });
  };

  $scope.getCurrentUser();

  var scoreColors = function(answers){
    var colorSet = {
      primaryColor: '',
      secondaryColor: '',
      vert: ''
    };
    answers.q4 === 'A' ? colorSet.vert = 'Introvert' : colorSet.vert = 'Extrovert';
    if (answers.q1 === 'A' && answers.q2 === 'A'){
      colorSet.primaryColor = 'Red';
      if (answers.q3 === 'A'){
        colorSet.secondaryColor = 'Blue';
      } else {
        colorSet.secondaryColor = 'Green';
      }
    } else if (answers.q1 === 'A' && answers.q2 === 'B'){
      colorSet.primaryColor = 'Gold';
      if (answers.q3 === 'A'){
        colorSet.secondaryColor = 'Blue';
      } else {
        colorSet.secondaryColor = 'Green';
      }
    } else if (answers.q1 === 'B' && answers.q3 === 'A'){
      colorSet.primaryColor = 'Blue';
      if (answers.q2 === 'A'){
        colorSet.secondaryColor = 'Red';
      } else {
        colorSet.secondaryColor = 'Gold';
      }
    } else if (answers.q1 === 'B' && answers.q3 === 'B'){
      colorSet.primaryColor = 'Green';
      if (answers.q2 === 'A'){
        colorSet.secondaryColor = 'Red';
      } else {
        colorSet.secondaryColor = 'Gold';
      }
    }
    return colorSet
  }

  $scope.submit4q = function(){
    console.log($scope.quiz);
    var answers = $scope.quiz
    var score = 0;
    for(var key in answers){
      if(answers[key] === false){
        var num = key.split('').splice(1).join();
        var errMess = 'Sorry, you didn\'t answer Question #' + num;
        console.log(errMess);
        return $scope.fourQerr = errMess;
      }
    }
    if ((!$scope.sample.name || !$scope.sample.email) && !$scope.currentUser) {
      var errMess = 'Please, give us a name and e-mail to better help us serve you.'
      return $scope.fourQerr = errMess;
    }
    console.log(answers);
    var colorSet = scoreColors(answers);
    console.log(colorSet);
    if ($scope.currentUser) {
      $scope.currentUser.primaryColor = colorSet.primaryColor;
      $scope.currentUser.secondaryColor = colorSet.secondaryColor;
      $scope.currentUser.vert = colorSet.vert;
      $http.put('/users/' + $scope.currentUser._id, colorSet).then(function(res){
        console.log(res);
      })
    } else {
      $scope.sample.primaryColor = colorSet.primaryColor;
      $scope.sample.secondaryColor = colorSet.secondaryColor;
      $scope.sample.vert = colorSet.vert;
      //sends the info to db, then returns results
      $http.post('/sample', $scope.sample).then(function(res){
        console.log(res);
        var result = res.data;
        if (result.primaryColor === 'Green'){
          $scope.fourQresults = $scope.colors[0];
        } else if (result.primaryColor === 'Blue'){
          $scope.fourQresults = $scope.colors[1];
        } else if (result.primaryColor === 'Gold'){
          $scope.fourQresults = $scope.colors[2];
        } else {
          $scope.fourQresults = $scope.colors[3];
        }
      });
    }
  };

}]);
