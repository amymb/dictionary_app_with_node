'use strict';
var app = angular.module("myapp", []);

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
  var formData = {};
  $scope.searchFunction = function(searchTerm){
    console.log(searchTerm)
    var url = '/api/' + (searchTerm);
    $http({method: 'GET', url: url}).
    success(function(data, status, headers, config) {
      var numberofuses = data.length
      var shuffleVoteSort = (shuffleArray(data)).sort(compare);
      var revisedForDisplay = shuffleVoteSort.map(function(quote){
        var asArray = quote.paragraphtext.split(" ");
        if(asArray.length >= 75){
          var newQuote = quote;
          var splicePoint = asArray.indexOf(searchTerm);
          if(splicePoint===-1) {splicePoint = asArray.indexOf(searchTerm.capitalize)};
          if(splicePoint===-1) {splicePoint = asArray.indexOf(searchTerm + "s")};
          if(splicePoint===-1){splicePoint = asArray.indexOf(searchTerm + ",")};
          if(splicePoint===-1){splicePoint = asArray.indexOf(searchTerm + ".")};
          console.log(splicePoint);
          if (splicePoint <= 38){
            newQuote["paragraphtext"] = asArray.splice(0, 75).join(" ") + "...";
          }else{
            var spliceAt = splicePoint - 38;
            var newQuoteBegin = asArray.splice(spliceAt, 75);
            newQuoteBegin.unshift("...")
            newQuote["paragraphtext"] = newQuoteBegin.join(" ") + "...";
          }
          return newQuote;
        }else{
          return quote;
        }
      });
      $scope.quote = revisedForDisplay;
    }).
    error(function(data, status, headers, config) {
    //In case your server respond with a 4XX or 5XX error code
    });
  }

})
