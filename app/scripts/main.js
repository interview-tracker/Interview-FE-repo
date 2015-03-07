;(function (){
  
  'use strict';

  angular.module('ScenicRoute', ['ngRoute', 'ngCookies', 'SRUser'])

  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers : {
        'X-Parse-Application-Id' : 'IUEoGuRvYaMSvXlmXKkqwyLxMN0xYBWixKfLxp1Y',
        'X-Parse-REST-API-Key'  : 'xt1xPy55Tn5lh84gm31MS9U7QiV1qTPD8OUPaUYf',
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
      templateUrl: 'scripts/users/user.login.tpl.html',
      controller: 'UserCtrl'
    })

    // Register page
    .when('/register', {
      templateUrl: 'scripts/users/user.register.tpl.html',
      controller: 'UserCtrl'
    })

    //Profile Create
    

    // Profile Page
    .when('/profile/:id', {
      templateUrl: 'scripts/users/users.profile.tpl.html',
      controller: ''
    })

    // Go Home ET
    .otherwise('/');
    
  }])

  .run([ '$rootScope', 'UserFactory', 'PARSE',

    function ($rootScope, UserFactory, PARSE) {

      $rootScope.$on('$routeChangeStart', function () {
        
        // Run my Login Status
        UserFactory.status();

      })
    
   }

  ])

}());