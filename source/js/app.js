// Проверяем нужна ли карта на странице и добавляем скрипты API Google Maps
document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelectorAll("#map").length > 0) {
    if (document.querySelector("html").lang)
      lang = document.querySelector("html").lang;
    else
      lang = "en";

    var js_file = document.createElement("script");
    js_file.type = "text/javascript";
    js_file.src = "https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyAMUMuva5VkEeo4WbgbTcL5d-xxoTI54Ig&language=" + lang;
    document.getElementsByTagName("head")[0].appendChild(js_file);
  };
});
// Добавляем карту
if (document.querySelectorAll("#map").length > 0) {
  function initMap() {
    var pinPosition = {
      lat: 59.938733,
      lng: 30.323054
    };

    var viewpoint = {
      lat: 59.939674,
      lng: 30.320976
    };

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: viewpoint,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapTypeId: "roadmap",
      styles: [
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#C6E2FF"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#C5E3BF"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#D1D1B8"
                        }
                    ]
                }
            ]
    });

    var marker = new google.maps.Marker({
      position: pinPosition,
      map: map,
      icon: "./img/map-pin.png"
    });
  };
};
