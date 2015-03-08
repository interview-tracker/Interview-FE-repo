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
      JobsFactory.add(listObj).success(function (results){
        listObj = results;
        console.log(results.listing);
        // $scope.jobs.push(listObj);

      });

    };

    $scope.addInt = function(id){
      $scope.int = {};
      JobsFactory.addInt(id).success(function (results){
        id = results;
        console.log(results);
      })
    }

    $scope.deleteMe = function (id, index) {
        JobsFactory.del(id).success( function (response) {
          $scope.jobs.splice(index, 1);
          console.log(response);
        });
      };

    var listOneJob = function (){

      JobsFactory.one($routeParams.id).success(function (res){
        // console.log(res);
        $scope.job = res.listing;
      });
    };
    listOneJob();

    $scope.newInterview = function (){
      console.log('blah');
      JobsFactory.addInt($routeParams.id, $scope.int).success (function (res){
        
        // $scope.int = res.listing;

        console.log($scope.int);
      })
      .error (function (res){
        console.log(res);
        console.log($routeParams.id);
      })
    };
    // newInterview();

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
