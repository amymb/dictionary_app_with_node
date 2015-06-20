var app = angular.module('sliderApp', []);

app.directive('abSlider', function($timeout) {
  console.log("hi")
  return {
    restrict: 'E',
    replace: true,
    scope: {
      quotes: '='
    },

    link: function(scope, elem, attrs) {
      scope.$watch('quotes', function(newVal, oldVal) {
        if (newVal){
          console.log('The object has changed.');
          scope.currentIndex = 0; // Initially the index is at the first image

          scope.next = function() {
              console.log(scope.currentIndex)
              scope.currentIndex < scope.quotes.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };

          scope.prev = function() {
            scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.quotes.length - 1;
          };
          scope.$watch('currentIndex', function() {
            scope.quotes.forEach(function(quote) {
              quote.visible = false; // make every image invisible
            });
            scope.quotes[scope.currentIndex].visible = true; // make the current image visible
          });
        }
      });



    },
    templateUrl: '/slider'
  };
});
