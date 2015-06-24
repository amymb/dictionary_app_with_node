// $(document).ready(function(){
//
//   Chart.defaults.global.responsive = true;
//
//   var labels = ["The Pickwick Papers", "Oliver Twist", "Nicholas Nickleby", "The Old Curiosity Shop", "Barnaby Rudge: A Tale of the Riots of 'Eighty",
//   "Martin Chuzzlewit", "Dombey and Son", "David Copperfield", "Bleak House", "Hard Times", "Little Dorrit",
//   "A Tale of Two Cities","Great Expectations", "Our Mutual Friend","The Mystery of Edwin Drood"];
//   var object = {}
//   var numbers = [];
//   var requestObj = labels.reduce(function(accum, incr){
//     accum[incr] = 0;
//     return object;
//   }, object)
//
//   $.ajax({url: "/quotations"})
//   .done(function(data){
//     data.forEach(function(quote){
//       if(requestObj.hasOwnProperty(quote.title)) return requestObj[quote.title] +=1;
//     })
//     for(prop in requestObj){
//       if(requestObj.hasOwnProperty(prop))
//         numbers.push(requestObj[prop])
//     }
//
//     var data = {
//       labels: ["The Pickwick Papers", "Oliver Twist", "Nicholas Nickleby", "The Old Curiosity Shop", "Barnaby Rudge: A Tale of the Riots of 'Eighty",
//       "Martin Chuzzlewit", "Dombey and Son", "David Copperfield", "Bleak House", "Hard Times", "Little Dorrit",
//       "A Tale of Two Cities","Great Expectations", "Our Mutual Friend","The Mystery of Edwin Drood"],
//       datasets: [
//         {
//           label: "My First dataset",
//           fillColor: "rgba(220,220,220,0.5)",
//           strokeColor: "rgba(220,220,220,0.8)",
//           highlightFill: "rgba(220,220,220,0.75)",
//           highlightStroke: "rgba(220,220,220,1)",
//           data: [7782, 8030, 7465, 4169, 4781, 7299, 7385, 7257, 7383, 2320, 6671, 3378, 3955, 8653, 2556]
//         }
//       ]
//     };
//
//     var ctx = document.getElementById("myChart").getContext("2d");
//
//     var myNewChart = new Chart(ctx).Bar(data);
//
//   });
// });
