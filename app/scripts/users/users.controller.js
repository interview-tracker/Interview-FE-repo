;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .controller('UserController', ['$scope', 'UserFactory', '$location',
  function($scope, UserFactory, $location){

    $scope.registerUser = function(userObj){
      UserFactory.register(userObj);
    };


    }

  ]);

}());
