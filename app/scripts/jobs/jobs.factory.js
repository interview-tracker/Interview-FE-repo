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
