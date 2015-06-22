'use strict';
var app = angular.module("myapp", ["quoteDisplayFilter", "ngSanitize", 'sliderApp', 'ui.bootstrap']);

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function compare(a, b){

  if ((a.upvotes-a.downvotes) < (b.upvotes-b.downvotes))
    return -1;
  if ((a.upvotes-a.downvotes) > (b.upvotes - b.downvotes))
    return 1;
  return 0;
}

app.controller('mainController', function ($scope, $http){
  $scope.searchFunction = function(searchTerm){
    console.log(searchTerm)
    var url = '/api/' + (searchTerm);
    $http({method: 'GET', url: url}).
    success(function(data, status, headers, config) {
      var numberofuses = data.length
      $scope.quotes = (shuffleArray(data)).sort(compare);
    }).
    error(function(data, status, headers, config) {
        //In case your server respond with a 4XX or 5XX error code
    });

  };
});

app.controller("quoteController", function($scope, $modal) {
  $scope.animationsEnabled = true;
  $scope.showModal= function(quote){
    console.log("and i'm in the scope.open")
    var modalInstance = $modal.open({
      animation: false,
      templateUrl: '/quote',
      controller: 'ModalDialogController',
      resolve: {
        quote: function(){
          return quote;
        }
      }
    });
    modalInstance.result.then();
  }
})

app.controller("ModalDialogController", function ($scope, $modalInstance, $http, quote) {
  $scope.Quote = quote;

  $scope.upvote = function(){
    $scope.Quote.upvotes += 1;
    var url = '/paragraphs/' + quote.id + '/upvotes';
    $http({method: 'POST', url: url})
    .success(function(){
      console.log("upvote recorded!")
    })
    .error(function(){
      console.log("something went wrong")
    })
  };

  $scope.downvote = function(){
    $scope.Quote.downvotes +=1
    var url = '/paragraphs/' + quote.id + '/downvotes';
    $http({method: 'POST', url: url})
    .success(function(){
      console.log("downvote recorded!")
    })
    .error(function(){
      console.log("something went wrong")
    })
  };

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
