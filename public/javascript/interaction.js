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

