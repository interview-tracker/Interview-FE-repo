;(function (){

  'use strict';

  angular.module('InterviewTracker', ['ngRoute', 'ngCookies',])

  .constant('HEROKU',{
    URL: 'https://interviewtracker-api.herokuapp.com/',
    CONFIG: {
      headers : {
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
    //get view for individual job list
    .when('/listings/:id', {
      templateUrl: 'scripts/jobs/jobs.jobid.html',
      controller: 'JobsController'
    })

    //Post Interview
    .when('/listing/:id/newinterview',{
      templateUrl: 'scripts/jobs/jobs.newinterview.tpl.html',
      controller: 'JobsController'
    })
    //pre interview tips page
    .when('/listing/:id/preinterview', {
      templateUrl: 'scripts/jobs/jobs.preinterview.tpl.html',
      controller: 'JobsController'
    })
    //post interview tips page
    .when('/listing/:id/postinterview', {
      templateUrl: 'scripts/jobs/jobs.postinterview.tpl.html',
      controller: 'JobsController'
    })


    // Profile Page
    .when('/profile/:id', {
      templateUrl: 'scripts/users/users.profile.tpl.html',
      controller: 'UserController'
    });

    // Go Home ET
    // .otherwise('/');

  }])

  .run([ '$rootScope', 'UserFactory', '$http', '$cookieStore',

    function ($rootScope, UserFactory, $http, $cookieStore) {

      $rootScope.$on('$routeChangeStart', function () {
        // $http.defaults.headers.commin.Authorization = 'GhBPRwKabKQX2wLzwU56';

        // Run my Login Status
        // console.log('Here');
        UserFactory.status();

      });

   }

 ]);

}());

;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .controller('UserController', ['$scope', 'UserFactory', '$location',
  function($scope, UserFactory, $location){

    var user = UserFactory.user();

    $scope.registerUser = function(userObj){
      UserFactory.register(userObj);
    };

    $scope.loginUser = function (userObj) {
        UserFactory.login(userObj);
      };

    }

  ]);

}());

;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .factory('UserFactory',['$http', 'HEROKU', '$cookieStore', '$location',
   function ($http, HEROKU, $cookieStore, $location){

     var currentUser = function () {
        return $cookieStore.get('auth_token');
      };

     var addUser = function(userObj){
       $http.post(HEROKU.URL + 'users', userObj, HEROKU.CONFIG)
       .success(function(res){
         console.log(res.user);
         $cookieStore.put('auth_token', res.user.authentication_token);
         HEROKU.CONFIG.headers['auth_token'] = res.user.authentication_token;
         return $location.path('/newlistings');
       });
     };

     var checkLoginStatus = function () {
        var user = currentUser();
        if (user) {
          HEROKU.CONFIG.headers['auth_token'] = user;
        }
      };


     var loginUser = function (userObj) {

        $http.post(HEROKU.URL + 'users/sign_in', userObj
        ).success (function (res) {
          console.log(res.user);
          $cookieStore.put('auth_token', res.user.authentication_token);
          HEROKU.CONFIG.headers['auth_token'] = res.user.authentication_token;

          $location.path('/listings');
        });

      };

      var logoutUser = function () {
        $cookieStore.remove('auth_token');
        $location.path('#/login');
      };


     return{
       user : currentUser,
       register : addUser,
       login : loginUser,
       logout : logoutUser,
       status : checkLoginStatus
     };

    }

   ]);

}());

;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .controller('JobsController', ['$rootScope', '$scope', 'JobsFactory', '$location', '$routeParams',

  function ($rootScope, $scope, JobsFactory, $location, $routeParams){

    $scope.jobs = [];

    JobsFactory.get().success(function(response){
      $scope.jobs = response.listings;

    })
    .error(function(res){
      console.log(res);
    })


    $scope.addJob = function(listObj){
      // console.log(listObj);
      $scope.job = {};
      JobsFactory.add(listObj).success(function (results){
        listObj = results;
        console.log(results.listing);
        // $scope.jobs.push(listObj);

      });

    };

    $scope.addInt = function(id){
      $scope.int = {};
      JobsFactory.addInt(id).success(function (results){
        id = results;
        console.log(results);
      })
    }

    $scope.deleteMe = function (id, index) {
        JobsFactory.del(id).success( function (response) {
          $scope.jobs.splice(index, 1);
          console.log(response);
        });
      };

    var listOneJob = function (){

      JobsFactory.one($routeParams.id).success(function (res){
        // console.log(res);
        $scope.job = res.listing;
      });
    };
    listOneJob();

    $scope.newInterview = function (){
      console.log('blah');
      JobsFactory.addInt($routeParams.id, $scope.int).success (function (res){
        
        // $scope.int = res.listing;

        console.log($scope.int);
      })
      .error (function (res){
        console.log(res);
        console.log($routeParams.id);
      })
    };
    // newInterview();

    var preInterview = function (){
      JobsFactory.preInt($routeParams.id).success(function (res){
        $scope.job = res.listing;
      });
    };

    var postInterview = function (){
      JobsFactory.postInt($routeParams.id).success(function (res){
        $scope.job = res.listing;
      });
    };



    }

  ]);

}());

;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .factory('JobsFactory', ['$http', 'HEROKU', 'UserFactory', '$routeParams',

  function ($http, HEROKU, UserFactory, $routeParams){

    var user = UserFactory.user;


    var getAllJobs = function(res){
      return $http.get(HEROKU.URL + 'users/listings', {
          headers: HEROKU.CONFIG.headers,
          // cache: true
      });

    };

    var getOneJob = function (id){
      return $http.get(HEROKU.URL + 'users/listings/' + id, 
        {headers: HEROKU.CONFIG.headers,}
        // cache: true
      );
    };

    var addJob = function(listObj){
      return $http.post(HEROKU.URL + 'users/listings', listObj, HEROKU.CONFIG);
      // headers: HEROKU.CONFIG.headers
    };


    var deleteList = function (id){
      return $http.delete(HEROKU.URL + 'users/listings/' + id, HEROKU.CONFIG);
    };

    // var preInt = function (id) {
    //   return $http.post(HEROKU.URL + $interpolate('users/listings/:id/interviews'), 
    //     {headers: HEROKU.CONFIG.headers,}
    //     );

    // };

    var addInterview = function (id, listObj){
      return $http.post(HEROKU.URL + 'users/listings/' + id + '/interviews', listObj, {header: HEROKU.CONFIG.headers});
    };

    // var addPostInterview = function (){
    //   return $http.post(HEROKU.URL)
    // }



    return {
      add : addJob,
      get : getAllJobs,
      one : getOneJob,
      del : deleteList,
      addInt : addInterview
      // preInt : preInt

    };

    }

  ]);

}());

;(function (){
  
  'use strict';

  angular.module('InterviewTracker')

  .controller('NavController', ['$scope', 'UserFactory', '$location', 

    function ($scope, UserFactory, $location) {
    
      var user = UserFactory.user();

      if (user) {
        $scope.loggedin = true;
        $scope.user = user;
      } else {
        $scope.loggedin = false;
      }


      $scope.logout = function () {
        UserFactory.logout();
      }; 



    }

  ])

}());