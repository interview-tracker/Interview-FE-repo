;(function() {
  "use strict";

  angular.module('InterviewTracker')

  .controller('JobsController', ['$scope', 'JobsFactory', '$location', 

  function ($scope, JobsFactory, $location){

    $scope.jobs = [];

    JobsFactory.get().success(function(response){
      $scope.jobs = response.results;
    });

    $scope.addJob = function(listObj){
      console.log(listObj);
      $scope.job = {};
      JobsFactory.add(listObj).success(function(results){
        listObj.id = results.id;
        $scope.jobs.push(listObj);

      });

    };


    }

  ]);

}());
