'use strict';
var app = angular.module("myapp", ["quoteDisplayFilter", "ngSanitize", 'sliderApp', 'ui.bootstrap', 'chartApp']);

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

  $scope.searchTerm = "Dickens"
  $scope.definitions = [{partOfSpeech: "noun", text: "Dickens, Charles John Huffam Pen name Boz. 1812-1870. British writer known for his tales of Victorian life and times. His works, which first appeared in serialized form, include The Pickwick Papers (1836-1837), Oliver Twist (1837-1838), and David Copperfield (1849-1850)."}];
  var wordnik_api_key;
  $http({method: 'GET', url: '/rest/getenv'})
  .success(function(data){
    wordnik_api_key = data.result;
  });

  $scope.searchFunction = function(searchTerm){
    $scope.searchTerm = searchTerm;
    var url = '/api/' + (searchTerm);
    var url2 = '/api/fulltext/' + (searchTerm);
    $http({method: 'GET', url: url}).
    success(function(data, status, headers, config) {
      $scope.numberofuses = data.length;
      $scope.quotes = (shuffleArray(data)).sort(compare);
    }).
     error(function(data, status, headers, config) {
         //In case your server respond with a 4XX or 5XX error code
     })
   };

  $scope.defineFunction = function(searchTerm){
    var searchFor = function(){
      if (searchTerm.split(" ").length >1){
        return searchTerm.split(" ").reduce(function (accum, incr){
          return  accum.length > incr.length ? accum: incr;
          })
        }
      else return searchTerm;
    };
    var url = "http://api.wordnik.com:80/v4/word.json/" + searchFor() + "/definitions?limit=3&api_key=" + wordnik_api_key;
    $http({method: 'GET', url: url}).
    success(function(data, status, headers, config){
      $scope.definitions = data;
    })
  };
})



app.controller("quoteController", function($scope, $modal, $http) {
  $scope.animationsEnabled = true;
  $scope.showModal= function(quote){
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

  $scope.m = function(){
    $http({method: 'GET', url: '/paragraphs'}).
    success(function(data){
      $scope.allQuotes = data;
    });
  }
})

app.controller("ModalDialogController", function ($scope, $modalInstance, $http, quote) {
  $scope.Quote = quote;

  $scope.upvote = function(){
    event.preventDefault();
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
    event.preventDefault();
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
