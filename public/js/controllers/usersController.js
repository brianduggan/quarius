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
    type: '0',
    active: 1
  }

  $scope.yearNow = (new Date()).getFullYear();

  $scope.signUser = {
    username: '',
    password: ''
  }

  var newUserReset = angular.copy($scope.newUser);
  var signUserReset = angular.copy($scope.signUser);

  $scope.allUsers = []
  $scope.currentUser = null;
  $scope.regMessage = null;
  $scope.regSuccess = false;
  $scope.logError = null;

  $scope.showSign = false;
  $scope.showPage = 0;
  $scope.fourQquiz = false;
  $scope.twelveQquiz = false;

  $scope.userview = 0;

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
    if ($scope.newUser.password !== $scope.newUser.confirmPassword){
      return $scope.regMessage = "Your Passwords do not match!"
    }
    var user = {user: $scope.newUser};
    $http.post('/users/', user).then(function(res){
      if (res.data.status === 302){
        $scope.regMessage = 'Sorry, this username exists'
      } else {
        $scope.regMessage = 'Success! You\'re account has been created. Please log-in'
        $scope.regSuccess = true;
        $scope.newUser = newUserReset;
      }
    });
  }

  $scope.getAllUsers = function(){
    $http.get('/users').then(function(res){
      $scope.allUsers = res.data.users;
    })
  }

  $scope.logIn = function(){
    var user = $scope.signUser;
    console.log(user);
    $http.post('/users/authenticate', user).then(function(res){
      if (res.data.status === 302) {
        console.log(res.data.status);
        $scope.logError = res.data.description;
      } else{
        var token = res.data.user.token;
        $cookies.put('token', token);
        $scope.fourQquiz = false;
        $scope.getCurrentUser();
        $window.location.reload();
      }
    });
  }

  $scope.logOut = function(){
    $cookies.remove('token');
    $scope.signUser = signUserReset;
    console.log(signUserReset);
    $scope.getCurrentUser();
    $window.location.reload();
  }

  $scope.getCurrentUser = function(){
    $http.get('/users/find/current').then(function(response){
      var currentUser = response.data;
      $scope.currentUser = currentUser;
    });
  };

  $scope.editAccount = function(){
    var user = $scope.currentUser;
    console.log(user);
    $http.patch('/users/' + user._id, user).then(function(response){
      console.log(response);
    });
  }

  $scope.take4Qquiz = function(){
    $scope.fourQquiz = 1;
  }

  $scope.closeTest = function(){
    $scope.fourQquiz = 0;
  }

  $scope.signUpModal = function(){
    $scope.showSign = true;
    $scope.regSuccess = false;
  }

  $scope.closeModal = function(){
    $scope.showSign = !$scope.showSign;
    $scope.regMessage = '';
  }

  $scope.getCurrentUser();

  // REMAINING FUNCTIONS CONTROL PAGE VIEW
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

  $scope.userHome = function(){
    $scope.userview = 0;
    $scope.showPage = 0;
  }

  $scope.userProfile = function(){
    $scope.userview = 1;
    $scope.showPage = 0;
  }

  $scope.userTeams = function(){
    $scope.userview = 2;
    $scope.showPage = 0;
  }

  $scope.teamManagement = function(){
    $scope.userview = 3;
  }

  $scope.getAllUsers();

}]);
