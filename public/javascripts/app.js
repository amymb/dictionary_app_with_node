// var isPaused = false;
// function slideshow (slides){
//   var counter = 0;
//   var i;
//   var j;
//   for (i = 0, j = 5000; i < slides.length; i += 1, j -= 1){
//     $(slides[i]).css("z-index", j);
//   }
//   return {
//     intervalId:  0,
//     startSlideshow: function () {
//       window.setInterval(function () {
//       if (!isPaused){
//         if (counter === 0) {
//           slides.eq(counter).fadeOut();
//           counter += 1;
//         } else if (counter === slides.length-1) {
//             counter = 0;
//             slides.eq(counter).fadeIn(function () {
//             slides.fadeIn();
//           });
//           } else {
//             slides.eq(counter).fadeOut();
//             counter += 1;
//           }
//         }
//       }, 2000);
//     },
//     pauseSlideshow: function(){
//       window.clearInterval(slideshow(slides.intervalId))
//     }
//   };
// };


$document.on('ready', function(){

  $("#searchTerm").on('click', function(){
    var slides = $(".photos-slideshow img");
    setTimeout(slideshow(slides).startSlideshow(), 1500);
  })
})
