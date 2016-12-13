// var testController = angular.module("TestController", ['ngCookies']);
//
// testController.controller('TestController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
//
//   $scope.currentUser = null;
//
//   $scope.getCurrentUser = function(callback){
//     var token = $cookies.get('token');
//     $http.get('/users/find/current').then(function(response){
//       var currentUser = response.data;
//       $scope.currentUser = currentUser;
//       if (callback){
//         callback();
//       }
//     });
//   };
//
//   $scope.clickMe = function(){
//     console.log('hi!');
//   };
//
//   $scope.getCurrentUser(function(){console.log($scope.currentUser);});
//
// }]);
