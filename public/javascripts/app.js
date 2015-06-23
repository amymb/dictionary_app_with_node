


$document.on('ready', function(){

  $("#searchTerm").on('click', function(){
    var slides = $(".photos-slideshow img");
    setTimeout(slideshow(slides).startSlideshow(), 1500);
  })
})
