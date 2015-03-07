;(function (){

  'use strict';

  angular.module('InterviewTracker', ['ngRoute', 'ngCookies',])

  .constant('HEROKU',{
    URL: 'https://interviewtracker-api.herokuapp.com/',
    CONFIG: {
      headers : {
        'auth_token' : '',
        'Content-Type' : 'application/json'
      }
    }
  })

  .config([ '$routeProvider', function ($routeProvider) {

    $routeProvider

    // Home Page
    .when('/', {
      templateUrl: 'scripts/users/users.home.tpl.html',
      controller: ''
    })

    // Login Page
    .when('/login', {
      templateUrl: 'scripts/users/users.login.tpl.html',
      controller: 'UserController'
    })

    // Register page
    .when('/register', {
      templateUrl: 'scripts/users/users.register.tpl.html',
      controller: 'UserController'
    })

    // Listings page
    .when('/listings',{
      templateUrl: 'scripts/users/users.listings/tpl.html',
      controller: 'UserController'
    })

    //Profile Create


    // Profile Page
    .when('/profile/:id', {
      templateUrl: 'scripts/users/users.profile.tpl.html',
      controller: 'UserController'
    })

    // Go Home ET
    .otherwise('/');

  }])

  .run([ '$rootScope', 'UserFactory', '$http',

    function ($rootScope, UserFactory, $http) {

      $rootScope.$on('$routeChangeStart', function () {
        // $http.defaults.headers.commin.Authorization = 'GhBPRwKabKQX2wLzwU56';

        // Run my Login Status
        // UserFactory.status();

      });

   }

 ]);

}());
