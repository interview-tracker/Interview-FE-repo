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
