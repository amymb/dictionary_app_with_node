var app = angular.module('chartApp', []);


app.directive('updateChart', function($timeout) {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      quotes: '='
    },
    link: function(scope, elem, attrs) {
      var data = {
        labels: ["The Pickwick Papers", "Oliver Twist", "Nicholas Nickleby", "The Old Curiosity Shop", "Barnaby Rudge",
        "Martin Chuzzlewit", "Dombey and Son", "David Copperfield", "Bleak House", "Hard Times", "Little Dorrit",
        "A Tale of Two Cities","Great Expectations", "Our Mutual Friend","The Mystery of Edwin Drood"],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [7782, 8030, 7465, 4169, 4781, 7299, 7385, 7257, 7383, 2320, 6671, 3378, 3955, 8653, 2556]
          }
        ]
      };
      var ctx = document.getElementById("myChart").getContext("2d");
      var myNewChart = new Chart(ctx).Bar(data);

      scope.$watch('quotes', function(newVal, oldVal) {
        var books = {"The Pickwick Papers": 0, "Oliver Twist": 0, "Nicholas Nickleby": 0, "The Old Curiosity Shop": 0,
        "Barnaby Rudge: A Tale of the Riots of 'Eighty": 0, "Martin Chuzzlewit": 0, "Dombey and Son": 0, "David Copperfield": 0,
        "Bleak House": 0, "Hard Times": 0, "Little Dorrit": 0, "A Tale of Two Cities": 0,"Great Expectations": 0,
        "Our Mutual Friend": 0,"The Mystery of Edwin Drood": 0}
        var newNumbers = [];
        console.log(newNumbers)
        if (newVal){
          scope.quotes.forEach(function(quote){
            if(books.hasOwnProperty(quote.title)) return books[quote.title] +=1;
          })
          for(prop in books){
            if(books.hasOwnProperty(prop)) newNumbers.push(books[prop])
          };

          for (i = 0; i < newNumbers.length; i++){
            myNewChart.datasets[0].bars[i].value = newNumbers[i];
            myNewChart.update();
          };
        }
      });
    },
    templateUrl: '/chart'
  };
});
