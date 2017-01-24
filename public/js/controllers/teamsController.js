var teamsController = angular.module("TeamsController", ['ngCookies']);

teamsController.controller('TeamsController', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){
  $scope.team = {
    name: '',
    management: [],
    teamMembers: []
  }


  $scope.createTeam = function(){
    var team = $scope.team;
    team.management.push($scope.currentUser._id);
    $http.post('/teams', team).then(function(response){
      console.log(response);
      var teamID = response.data._id;
      $scope.currentUser.teams.push(teamID);
      $http.patch('/users/'+ $scope.currentUser._id, $scope.currentUser).then(function(newRes){
        console.log($scope.currentUser);
        console.log(newRes);
      })
    })
  }

}]);
