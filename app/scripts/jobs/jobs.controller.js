;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .controller('JobsController', ['$scope', 'JobsFactory', '$location',

  function ($scope, JobsFactory, $location){

    $scope.jobs = [];

    JobsFactory.get().success(function(response){
      $scope.jobs = response.listings;
    });

    $scope.addJob = function(listObj){
      // console.log(listObj);
      $scope.job = {};
      JobsFactory.add(listObj).success(function(results){
        listObj = results;
        console.log(results.listing);
        // $scope.jobs.push(listObj);

      });

    };

    $scope.deleteMe = function (id, index) {
        JobsFactory.del(id).success( function (response) {
          $scope.jobs.splice(index, 1);
          console.log(response);
        });
      };


    }

  ]);

}());
