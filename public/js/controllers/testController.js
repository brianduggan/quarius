var testController = angular.module("TestController", ['ngCookies']);

testController.controller('TestController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.currentUser = {};

  $scope.getCurrentUser = function(){
    var token = $cookies.get('token');
    $http.get('/users/find/current').then(function(response){
      var currentUser = response.data;
      $scope.currentUser = currentUser;
    });
  };

  $scope.clickMe = function(){
    console.log('hi!');
  };

  $scope.getCurrentUser();

}]);
