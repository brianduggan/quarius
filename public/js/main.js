var app = angular.module('QuariusApp', ['ngCookies']);

app.controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.newUser = {
    username: '',
    password: '',
    birthdate: '',
    email: '',
    type: 0
  }

  $scope.allUsers = {};

  $scope.currentUser = {};

  $scope.register = function(){
    console.log($scope.newUser);
    var user = {user: $scope.newUser};
    $http.post('/users', user).then(function(req,res){
      $scope.getAllUsers();
    });
  }

  $scope.getAllUsers = function(){
    $http.get('/users').then(function(res){
      console.log(res.data.users);
      $scope.allUsers = res.data.users;
    })
  }

  $scope.getAllUsers();

  $scope.logIn = function(){
    console.log('log-in');
  }

}]);
