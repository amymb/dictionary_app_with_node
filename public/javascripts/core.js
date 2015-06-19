'use strict';
var app = angular.module("myapp", ["quoteDisplayFilter"]);

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
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
  return 0;
}

app.controller('mainController', function ($scope, $http){
  $scope.searchFunction = function(searchTerm){
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
