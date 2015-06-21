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
  if (a.votes < b.votes)
    return -1;
  if (a.votes> b.votes)
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
  console.log("i'm in the quote controller")
  $scope.animationsEnabled = true;
  $scope.showModal= function(){
    console.log("and i'm in the scope.open")
    console.log($scope.quote)
    var modalInstance = $modal.open({
      animation: false,
      templateUrl: '/quote',
      controller: 'ModalDialogController',
    });

    modalInstance.result.then(
      function () {
        alert("OK");
      },
      function () {
        alert("Cancel");
      }
    );
  }
})

app.controller("ModalDialogController", function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
