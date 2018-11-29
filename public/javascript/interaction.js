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

  var im = '/images/631348-200.png';
  function initMap(){
      navigator.geolocation.getCurrentPosition(initialize,fail);
  }

  function initialize(position) {
      var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var currentLat = position.coords.latitude; 
      var currentLong = position.coords.longitude;
   
      var mapOptions = {
        zoom: 16,
        center: myLatLng,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false
    }
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var userMarker = new google.maps.Marker({
          position: myLatLng,
          map: map, 
          icon: im
      });
    var geocoder = new google.maps.Geocoder;
    geocodeLatLng(geocoder, map, currentLat, currentLong); 
  }
  function fail(){
      alert('navigator.geolocation failed, may not be supported');
  }
   
  function geocodeLatLng(geocoder, map, currentLat, currentLong) {
  var latlng = {lat: currentLat, lng: currentLong};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        $('#origin-input').val(results[0].formatted_address);
        console.log(results[0].formatted_address);
      } else {
        // var originInput = 'No results found';
        console.log("no result")
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
    }
  });

}