;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .factory('JobsFactory', ['$http', 'HEROKU', 'UserFactory',

  function ($http, HEROKU, UserFactory){

    var user = UserFactory.user;


    var getAllJobs = function(res){
      return $http.get(HEROKU.URL + 'users/listings', {
          headers: HEROKU.CONFIG.headers,
          cache: true
      });

    };

    var getOneJob = function (res){
      return $http.get(HEROKU.URL + 'users/listings/[:id]', {
        headers: HEROKU.CONFIG.headers,
        cache: true
      });
    };

    var addJob = function(listObj){
      return $http.post(HEROKU.URL + 'users/listings', listObj, HEROKU.CONFIG);
      headers: HEROKU.CONFIG.headers
    };

    return {
      add : addJob,
      get : getAllJobs,
      one : getOneJob
    };

    }

  ]);

}());
