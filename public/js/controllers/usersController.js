var usersController = angular.module("UsersController", ['ngCookies']);

usersController.controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.newUser = {
    username: '',
    password: '',
    birthdate: '',
    email: '',
    type: 0
  }

  $scope.signUser = {
    username: '',
    password: ''
  }

  $scope.allUsers = {};

  $scope.currentUser = null;

  $scope.register = function(){
    console.log($scope.newUser);
    var user = {user: $scope.newUser};
    $http.post('/users/', user).then(function(req,res){
      $scope.getAllUsers();
    });
  }

  $scope.getAllUsers = function(){
    $http.get('/users').then(function(res){
      console.log(res.data.users);
      $scope.allUsers = res.data.users;
    })
  }

  $scope.logIn = function(){
    var user = $scope.signUser;
    $http.post('/users/authenticate', user).then(function(res){
      var token = res.data.user.token;
      $cookies.put('token', token);
    });
  }

  $scope.logOut = function(){
    $cookies.remove('token');
    $scope.currentUser = null;
  }

  $scope.getCurrentUser = function(){
    var token = $cookies.get('token');
    $http.get('/users/find/current').then(function(response){
      var currentUser = response.data;
      $scope.currentUser = currentUser;
    });
  };

  $scope.getCurrentUser();

}]);
