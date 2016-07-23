jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
    var markers = [
        ['Chapel Hill North', 30.5310363, -97.67719410000001, 1, 'ChIJLXy1_p_RRIYRItDNUr4Jj1s'],
        ['Chisholm Valley', 30.4956254, -97.6832998, 2, 'ChIJNYApgOXRRIYR-lTclDmzG00'],
        ['Downtown', 30.511015, -97.673859, 3, ''],
        ['Egger Acres', 30.5247191, -97.67515899999999, 4, 'ChIJRfGyZaLRRIYRCsbxjO0AGOE'],
        ['Greater RR West', 30.5005473, -97.69686999999999, 5, 'ChIJteL-EffRRIYRelLwSyaFg8w'],
        ['Green Slopes at Lake Creek', 30.5024678, -97.664306, 6, 'ChIJNS5HwMXRRIYRrmS_vd33qVQ'],
        ['Green Hill', 30.5278551, -97.6826214, 7, 'ChIJvzjPI5zRRIYRvi3rGydtXpE'],
        ['Kensington Place', 30.4915368, -97.66769739999999, 8, 'ChIJw664gtnRRIYR2AMM0HzulpA' ],
        ['Mesa Park', 30.525039, -97.66973229999999, 9, 'ChIJxX8UZqTRRIYRPDRT3Oq66HQ'],
        ['Mesa Ridge', 30.5224975, -97.664306, 10, 'ChIJVfo2ka_RRIYR1CAbX1_uE1E'],
        ['Old Town Meadows', 30.5198208, -97.69754859999999, 11, 'ChIJAytv8YfRRIYRmKYoDim5Wfs'],
        ['Rolling Ridge', 30.499411, -97.63107909999999, 12, 'ChIJsQyXGBjQRIYRIiMh-N8MV4Q'],
        ['The Settlement', 30.542140, -97.666608, 13, ''],
        ['Shadow Pointe', 30.5001263, -97.64328309999999, 14, 'ChIJO-u6lzrQRIYR2mpLDNy6qOc'],
        ['South Creek', 30.506127, -97.6507421, 15, 'ChIJQyklazTQRIYRQK8L9QHL_gw'],
        ['Sunrise Park/Vista/Willow Bend Estates', 30.5328667, -97.6704106, 16, 'ChIJi_xSCQrRRIYRGrrKqDvg5sI']
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['1'],
        ['2'],
        ['3'],
        ['4'],
        ['5'],
        ['6'],
        ['7'],
        ['8'],
        ['9'],
        ['10'],
        ['11'],
        ['12'],
        ['13'],
        ['14'],
        ['15'],
        ['16']
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0] + ': ' + markers[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(13);
        google.maps.event.removeListener(boundsListener);
    });
    
}