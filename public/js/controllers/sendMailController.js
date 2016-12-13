var sendMailController = angular.module("sendMailController", ['ngCookies']);

sendMailController.controller('sendMailController', ['$scope', '$http', function($scope, $http){

  $scope.showMessage = null;

  $scope.contact = {
    name: '',
    email: '',
    message: ''
  };

  $scope.contactReset = angular.copy($scope.contact);

  $scope.sendMail = function(){
    $scope.showMessage = 'sending...'
    var data = {
      name: $scope.contact.name,
      email: $scope.contact.email,
      subject: $scope.contact.subject,
      message: $scope.contact.message,
      topic: $scope.contact.topic
    }
    $http.post('/contact', data).then(function(response){
      if (response.status === 200){
        $scope.showMessage = 'Sent!';
        $scope.contact = $scope.contactReset;
      } else {
        $scope.showMessage = 'There was an error sending your message';
      }
    })
  }

}]);
