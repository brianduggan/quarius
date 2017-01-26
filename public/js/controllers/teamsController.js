var teamsController = angular.module("TeamsController", ['ngCookies']);

teamsController.controller('TeamsController', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){
  $scope.team = {
    name: '',
    management: [],
    teamMembers: []
  }

  $scope.currentTeam = '';

  $scope.createTeam = function(){
    var team = $scope.team;
    team.management.push($scope.currentUser._id);
    $http.post('/teams', team).then(function(response){
      console.log(response);
      var teamID = response.data._id;
      $scope.currentUser.teams.push(teamID);
      $scope.teamManagement();
      $scope.getCurrentTeam(teamID)
      $http.patch('/users/'+ $scope.currentUser._id, $scope.currentUser).then(function(newRes){
        $scope.getCurrentUser();
      })
    })
  }

  $scope.getCurrentTeam = function(id){
    $http.get('/teams/' + id).then(function(response){
      $scope.currentTeam = response.data;
      $scope.teamManagement();
    })
  }

  $scope.addToCurrentTeam = function(userID){
    console.log(userID);
    console.log('Hi!');
    var teamID = $scope.currentTeam._id;
    if( !$scope.currentTeam.teamMembers.includes(userID) ){
      console.log('wasn\'t there yet');
      $scope.currentTeam.teamMembers.push(userID);
      console.log($scope.currentTeam);
      $http.put('/teams/' + teamID, $scope.currentTeam).then(function(res1){
        console.log(res1);
        teamID = {teamID: teamID}
        $http.put('/users/teams/' + userID, teamID).then(function(res2){
          console.log(res2);
          $scope.teamManagement();
          $scope.getCurrentTeam(teamID.teamID);
          // $scope.currentTeam = res1.data;   WHERE SHOULD THIS GO TO ADD THE DATA LIVE???
        })
      });
    }
  }

  $scope.backToTeamList = function(){
    $scope.userTeams();
  }

}]);
