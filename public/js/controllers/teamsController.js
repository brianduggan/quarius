var teamsController = angular.module("TeamsController", ['ngCookies']);

teamsController.controller('TeamsController', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){
  $scope.team = {
    name: '',
    management: [],
    teamMembers: [],
    active: 1
  }

  $scope.currentTeam = '';

  $scope.createTeam = function(){
    var team = $scope.team;
    // ADDS CREATOR TO BOTH TEAM AND MANAGEMENT SECTIONS
    team.management.push($scope.currentUser._id);
    team.teamMembers.push($scope.currentUser._id);
    //REQUEST TO CREATE TEAM
    $http.post('/teams', team).then(function(response){
      console.log(response);
      var teamID = response.data._id;
      $scope.currentUser.teams.push(teamID); //ADDS TEAM ID TO CURRENT USER'S TEAMS
      $scope.teamManagement(); //NAVIGATES TO TEAM MANAGEMENT VIEW... THIS LINE MAYBE REDUNDANT
      $scope.getCurrentTeam(teamID); //LOADS CURRENT TEAM
      // REQUEST TO SAVE USER WITH NEW TEAM ID
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

  //FILTERS VIEW TO SEE IF CURRENT USER IS A MANAGER OF A GIVEN TEAM
  $scope.filterForManagement = function(){
    if ($scope.currentTeam.management){
      for (var i = 0; i < $scope.currentTeam.management.length; i++) {
        if($scope.currentTeam.management[i]._id === $scope.currentUser._id){
          return true;
        }
      }
    }
    return false;
  }

  //FILTERS SEARCH RESULTS TO ONLY VIEW ADD TEAM MEMBER OPTION IF A USER IS NOT CURRENTLY A TEAM MEMBER
  $scope.searchNewMembers = function(id){
    if($scope.currentTeam.teamMembers){

      for (var i = 0; i < $scope.currentTeam.teamMembers.length; i++) {
        if ($scope.currentTeam.teamMembers[i]._id === id){
          return false;
        }
      }
    }
    return true;
  }

  //ADDS A USER FROM THE SEARCH LIST TO THE CURRENT TEAM
  $scope.addToCurrentTeam = function(userID){
    var teamID = $scope.currentTeam._id;
    if( !$scope.currentTeam.teamMembers.includes(userID) ){
      $scope.currentTeam.teamMembers.push(userID);
      //REQUEST TO UPDATE TEAM WITH NEW USER ID
      $http.put('/teams/' + teamID, $scope.currentTeam).then(function(res1){
        console.log(res1);
        teamID = {teamID: teamID, action: 'add'};
        //REQUEST TO ADD THE CURRENT TEAM TO THE USER'S TEAM ARRAY... DONE ON BACK END
        $http.put('/users/teams/' + userID, teamID).then(function(res2){
          console.log(res2);
          $scope.teamManagement();
          $scope.getCurrentTeam(teamID.teamID);
        })
      });
    }
  }

  $scope.removeUserFromTeam = function(userID){
    console.log(userID);
    for (var i = 0; i < $scope.currentTeam.teamMembers.length; i++) {
      if ($scope.currentTeam.teamMembers[i]._id === userID){
        $scope.currentTeam.teamMembers.splice(i,1);
      }
    }
    $http.put('/teams/'+$scope.currentTeam._id, $scope.currentTeam).then(function(res1){
      teamID = {teamID: $scope.currentTeam._id, action: 'remove'};
      $http.put('/users/teams/'+userID, teamID).then(function(res2){
        $scope.teamManagement();
      })
    })
  }

  $scope.backToTeamList = function(){
    $scope.userTeams();
  }

}]);
