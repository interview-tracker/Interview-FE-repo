;(function (){

  'use strict';

  angular.module('InterviewTracker', ['ngRoute', 'ngCookies',])

  .constant('HEROKU',{
    URL: 'https://interviewtracker-api.herokuapp.com/',
    CONFIG: {
      headers : {
        'auth_token' : '1_e-BzfNpvrRKdYdMisr',
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

    // Post Listings page
    .when('/newlistings', {
      templateUrl: 'scripts/jobs/jobs.postlist.tpl.html',
      controller: 'JobsController'
    })

    // get jobs list
    .when('/listings', {
      templateUrl: 'scripts/jobs/jobs.getlist.html',
      controller: 'JobsController'
    })


    // Profile Page
    .when('/profile/:id', {
      templateUrl: 'scripts/users/users.profile.tpl.html',
      controller: 'UserController'
    })

    // Go Home ET
    .otherwise('/');

  }])

  .run([ '$rootScope', 'UserFactory', '$http', '$cookieStore', 

    function ($rootScope, UserFactory, $http, $cookieStore) {

      $rootScope.$on('$routeChangeStart', function () {
        // $http.defaults.headers.commin.Authorization = 'GhBPRwKabKQX2wLzwU56';

        // Run my Login Status
        // UserFactory.status();

      });

   }

 ]);

}());
