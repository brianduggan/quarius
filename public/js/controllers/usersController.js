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

  $scope.newUserReset = angular.copy($scope.newUser);

  $scope.allUsers = {};
  $scope.currentUser = null;
  $scope.regMessage = null;
  $scope.regSuccess = false;
  $scope.logError = null;
  $scope.showSign = false;
  $scope.showPage = 0;

  $scope.colors = [
    {
      name: 'Green',
      icon: '●',
      qualities: ['Expressive', 'Empathetic', 'People-Focused']
    },
    {
      name: 'Blue',
      icon: '■',
      qualities: ['Analytical', 'Theoretical', 'Competitive']
    },
    {
      name: 'Gold',
      icon: '▲',
      qualities: ['Organized', 'Systematic', 'Accountable']
    },
    {
      name: 'Red',
      icon: '⬟',
      qualities: ['Courageous', 'Spontaneous', 'Action-Oriented']
    }
  ];

  $scope.register = function(){
    console.log($scope.newUser);
    var user = {user: $scope.newUser};
    $http.post('/users/', user).then(function(res){
      if (res.data.status === 302){
        $scope.regMessage = 'Sorry, this username exists'
      } else {
        $scope.regMessage = 'Success! You\'re account has been created. Please log-in'
        $scope.regSuccess = true;
        $scope.newUser = $scope.newUserReset;
      }
    });
  }

  $scope.getAllUsers = function(){
    $http.get('/users').then(function(res){
      // console.log(res.data.users);
      $scope.allUsers = res.data.users;
    })
  }

  $scope.logIn = function(){
    var user = $scope.signUser;
    $http.post('/users/authenticate', user).then(function(res){
      if (res.data.status === 302) {
        console.log(res.data.status);
        $scope.logError = res.data.description;
      } else{
        var token = res.data.user.token;
        $cookies.put('token', token);
        $scope.getCurrentUser();
      }
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

  $scope.signUpModal = function(){
    $scope.showSign = true;
    $scope.regSuccess = false;
  }

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
