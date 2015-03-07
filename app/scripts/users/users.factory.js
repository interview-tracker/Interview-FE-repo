;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .factory('UserFactory',['$http', 'HEROKU', '$cookieStore', '$location',
   function($http, HEROKU, $cookieStore, $location){

     var currentUser = function () {
        return $cookieStore.get('currentUser');
      };

     var addUser = function(userObj){
       $http.post(HEROKU.URL + 'users', userObj, HEROKU.CONFIG)
       .then(function(res){
         console.log(res);
       });
     };

     var loginUser = function (userObj) {


        $http.post(HEROKU.URL + 'users/sign_in', userObj, {
          headers: HEROKU.CONFIG,
        }).then (function (res) {
          console.log(res);
          $cookieStore.put('currentUser', res.data.user.authentication_token);
          // $location.path('/list');
        });

      };


     return{
       user: currentUser,
       register : addUser,
       login : loginUser
     };

    }

   ]);

}());
