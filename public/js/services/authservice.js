var AuthService = angular.module('AuthService', []);

AuthService.factory('AuthService', ['$q', '$timeout', '$http', function($q, $timeout, $http){
  var user = null;

  return ({
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus,
    login: login,
    logout: logout,
    register: register
  });

  function getUserStatus() {
    return user;
  }



}])
