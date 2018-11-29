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
  var directionsService;
  var directionsDisplay;
  //Generating the map.
  function initialize(position) {
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
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
  // reverse geocoding from latlng to adress.
  function geocodeLatLng(geocoder, map, currentLat, currentLong) {
  var latlng = {lat: currentLat, lng: currentLong};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        //updating the starting input field with the users current location.
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
  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    console.log("Input is changed");
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  $('#origin-input').on( "change", onChangeHandler )
  $('#destination-input').on( "change", onChangeHandler )
}
//funciton to calculate and display the route based on the origin and destination the user entered. 
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: $('#origin-input').val(),
    destination: $('#destination-input').val(),
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      // !!!! change to better visible error message for user.
      console.log('Directions request failed due to ' + status);
    }
  });
}



