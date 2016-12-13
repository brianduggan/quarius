var usersController = angular.module("UsersController", ['ngCookies']);

usersController.controller('UsersController', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){

  $scope.newUser = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    company: '',
    email1: '',
    email2: '',
    offPhone: '',
    cellPhone: '',
    type: 0
  }

  $scope.signUser = {
    username: '',
    password: ''
  }

  $scope.allUsers = {};

  $scope.currentUser = null;

  $scope.showSign = false;

  $scope.showPage = 0;

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
      $scope.getCurrentUser();
    });
  }

  $scope.logOut = function(){
    $cookies.remove('token');
    $scope.currentUser = null;
    $scope.getCurrentUser();
  }

  $scope.getCurrentUser = function(){
    var token = $cookies.get('token');
    $http.get('/users/find/current').then(function(response){
      var currentUser = response.data;
      $scope.currentUser = currentUser;
    });
  };

  $scope.closeModal = function(){
    $scope.showSign = !$scope.showSign;
  }

  $scope.getCurrentUser();

  $scope.showAbout = function(){
    $scope.showPage = 1;
  }

  $scope.showContact = function(){
    $scope.showPage = 2;
  }

  $scope.showResources = function(){
    $scope.showPage = 3;
  }

  $scope.showMain = function(){
    $scope.showPage = 0;
  }

}]);
