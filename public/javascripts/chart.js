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

          for (var i = 0; i < newNumbers.length; i++){
            myNewChart.datasets[0].bars[i].value = newNumbers[i];
            myNewChart.update();
          };
        }
      });
    },
    templateUrl: '/chart'
  };
});

// app.directive('fillChart', function($timeout) {
//   console.log('hi')
//   return {
//     restrict: 'E',
//     replace: true,
//     scope: {
//       years: '='
//     },
//     link: function(scope, elem, attrs) {
//         var m = function(){
//         var temp = [];
//         for(var i=1800; i <= 2012; i++){
//           temp.push(i);
//         }
//         return temp;
//       };
//
//       var data = {
//         labels: m(),
//         datasets: [
//           {
//           label: "My First dataset",
//           fillColor: "rgba(220,220,220,0.5)",
//           strokeColor: "rgba(220,220,220,0.8)",
//           highlightFill: "rgba(220,220,220,0.75)",
//           highlightStroke: "rgba(220,220,220,1)",
//           data: [6,0,2,1,0, 1,3,0,0,0,0,0,1,10,1,2,4,2,1,2,1,0,0,2,45,2,2,242,0,11,0,
//                 4,1,1,1,1,35,1,1,2,4,1,3,2,2,2,3,2,2,1,2,1,2,2,3,5,4,3,55,6,11,10,4,3,4,
//                 6,2,5,5,32,9,7,1,5,3,3,1,8,1,2,2,3,9,2,2,2,5,34,3,7,3,4,2,2,12,1,3,3,2,14,
//                 4,10,5,4,3,6,3,4,2,1,3,3,3,1,60,5,1,18,13,3,4,2,4,5,4,4,11,3,3,3,2,2,1,2,
//                 1,1,1,1,2,3,0,1,1,1,1,2,1,1,1,1,2,2,1,2,0,1,1,0,1,2,0,1,1,2,1,1,0,0,1,1,0,
//                 1,1,0,1,0,3,2,8,7,8,7,3,2,1,2,9]
//           }
//         ]
//       };
//
//       var options = {
//         scaleGridLineWidth : 20,
//         scaleShowVerticalLines: false
//       }
//       var ctx = document.getElementById("myChart").getContext("2d");
//       var myNewChart = new Chart(ctx).Line(data, options);
//
//       scope.$watch('years', function(newVal, oldVal) {
//         if (newVal){
//           var newNumbers = scope.years.frequency.map(function(year){
//             return year.count
//           });
//           console.log(newNumbers)
//           for (var i = 0; i < newNumbers.length; i++){
//             myNewChart.datasets[0].points[i].value = newNumbers[i];
//             myNewChart.update();
//           };
//         }
//       });
//     },
//     templateUrl: '/chart2'
//   };

// });
