;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .factory('UserFactory',['$http', 'HEROKU', '$cookieStore', '$location',
   function($http, HEROKU, $cookieStore, $location){

     var addUser = function(userObj){
       $http.post(HEROKU.URL + 'users', userObj, HEROKU.CONFIG)
       .then(function(res){
         console.log(res);
       });
     };


     return{
       register : addUser
     };

    }

   ]);

}());
