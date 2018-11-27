$("#drinker-btn").click(function(){
    $("#driver").attr('class', 'hide');
    $("#drinker").attr('class', '');
});

$("#driver-btn").click(function(){
    $("#drinker").attr('class', 'hide');
    $("#driver").attr('class', '');
});

$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });
  });

  //google maps functionality 
 
var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
});
}




