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

    var listOneJob = function (){

      JobsFactory.one($routeParams.id).success(function (res){
        console.log(res);
        $scope.job = res.listing;
      });
    };
    listOneJob();

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
