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

  $('.ml3').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({loop: false})
    .add({
      targets: '.ml3 .letter',
      opacity: [0,1],
      easing: "easeInOutQuad",
      duration: 2000,
      delay: function(el, i) {
        return 110 * (i+1)
      }
    }).add({
      targets: '.ml3',
      opacity: 1,
      duration: 200,
      easing: "easeOutExpo",
    });
  });
  
  var im = '/images/dance.gif';

  function initMap(){
      navigator.geolocation.getCurrentPosition(initialize,fail);
  }
  var directionsService;
  var directionsDisplay;
  var autocomplete;

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
        zoomControl: false,
        styles:  [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
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
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    calculateDistance();
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

  // calculate distance
  function calculateDistance() {
    var origin = $('#origin-input').val();
    var destination = $('#destination-input').val();
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
            // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
            avoidHighways: false,
            avoidTolls: false
        }, callback);
}

// get distance results
function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
      $('#result').html(err);
  } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
          $('#result').html("Better get on a plane. There are no roads between "  + origin + " and " + destination);
      } else {
          var distance = response.rows[0].elements[0].distance;
          var duration = response.rows[0].elements[0].duration;
          var distance_in_kilo = distance.value / 1000; // the kilom
          var duration_value = duration.value;
          $('#in_kilo').text(distance_in_kilo.toFixed(2));
          $('#duration_value').text(duration_value / 100);
          //update price based on distance 
          getPrice(distance_in_kilo);
     }
  }
}

// calculate and update price
function getPrice(distance) {
  $('#ride-price').text(Number(distance * 2).toFixed(2))
}

$('#confirm-btn').click(()=> {
  axios.post("/map-ride", {data: {
    originGeoCode: "x",
    destinationGeoCode: "x",
    originAdress: $('#origin-input').val(),
    destinationAdress: $('#destination-input').val(),
    travelDistance: $('#in_kilo').text(),
    travelDuration: $('#duration_value').text(),
    priceOfRide: $('#ride-price').text()
    }})
  .then((result)=> {
    console.log("post req succesfully done.")
  })
  .catch((err)=>{ 
    if (err) console.log("Error" + err);
  })
})
// onclick extract all values
