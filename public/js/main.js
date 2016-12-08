var app = angular.module('QuariusApp', ['UsersController', 'TestController', 'ngCookies', 'AuthService']);

// app.config(['$routeProvider', function($routeProvider){
//   $routeProvider
//     .when('/test', {
//       templateUrl: './partials/index.jade',
//       controller: 'usersController'
//     })
// }]);
//
// app.run(function($rootScope, $location, $route, AuthService){
//   $rootScope.$on('$routeChangeStart', function(event, next, current){
//     if (AuthService.isLoggedIn === false){
//       $location.path('/login');
//     }
//   })
// })
