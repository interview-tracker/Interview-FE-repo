;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .factory('JobsFactory', ['$http', 'HEROKU', 'UserFactory',

  function($http, HEROKU, UserFactory){

    var user = UserFactory.user;

    var getAllJobs = function(res){
      return $http.get(HEROKU.URL + 'users/listings', {
          headers: HEROKU.CONFIG.headers,
          cache: true
      });

    };

    var addJob = function(listObj){
      return $http.post(HEROKU.URL + 'users/listings', listObj, HEROKU.CONFIG);
      // console.log(a);
    };

    return {
      add : addJob,
      get : getAllJobs
    };

    }

  ]);

}());
