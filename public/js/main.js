var app = angular.module('QuariusApp', ['ngCookies']);

app.controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.newUser = {
    username: '',
    password: ''
  }

  $scope.currentUser = {};

  $scope.register = function(){
    console.log($scope.newUser);
    var user = {user: $scope.newUser};
    $http.post('/users', user).then(function(req,res){
      console.log('do something');
    });
  }

  $scope.logIn = function(){
    console.log('log-in');
  }

}]);
