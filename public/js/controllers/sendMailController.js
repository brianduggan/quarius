var sendMailController = angular.module("sendMailController", ['ngCookies']);

sendMailController.controller('sendMailController', ['$scope', '$http', function($scope, $http){

  $scope.contact = {
    name: '',
    email: '',
    message: ''
  };

  $scope.sendMail = function(){
    var data = {
      name: $scope.contact.name,
      email: $scope.contact.email,
      message: $scope.contact.message
    }
    $http.post('/contact', data).then(function(response){
      console.log(response);
    })
    console.log(data);
  }

}]);
