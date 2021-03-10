
// let waypoints = [
//     [47.60638, -122.33223], [47.60658, -122.33336], [47.60704, -122.33301],
//     [47.6077, -122.33146], [47.60752, -122.3307], [47.60487, -122.3284],
//     [47.59978, -122.32278], [47.59601, -122.32096], [47.5905, -122.32136],
//     [47.58376, -122.32016], [47.5766, -122.31983], [47.57105, -122.32022],
//     [47.56104, -122.32208], [47.55735, -122.3209], [47.55357, -122.31832],
//     [47.54842, -122.31201], [47.53977, -122.30224], [47.53333, -122.29597],
//     [47.5184, -122.28932], [47.50775, -122.28168], [47.49943, -122.27401],
//     [47.49141, -122.26501], [47.48912, -122.26475], [47.4878, -122.26564],
//     [47.48191, -122.27241], [47.47791, -122.27183], [47.47402, -122.26972],
//     [47.46233, -122.26557], [47.45608, -122.26426], [47.44384, -122.2682],
//     [47.43495, -122.27013], [47.4315, -122.27187], [47.42048, -122.28722],
//     [47.41583, -122.29017], [47.40576, -122.29256], [47.38374, -122.29047],
//     [47.37348, -122.29278], [47.35906, -122.2965], [47.35461, -122.29669],
//     [47.34895, -122.2944], [47.34448, -122.29305], [47.34013, -122.29328],
//     [47.32832, -122.29429], [47.32297, -122.29492], [47.31378, -122.29827],
//     [47.2903, -122.30663], [47.28211, -122.30944], [47.26985, -122.31757],
//     [47.26095, -122.32717], [47.25334, -122.33238], [47.24556, -122.33454],
//     [47.24249, -122.33754], [47.24133, -122.34347], [47.24079, -122.36476],
//     [47.24124, -122.38361], [47.24155, -122.39362], [47.23981, -122.40233],
//     [47.23837, -122.41806], [47.23348, -122.43224], [47.23166, -122.44116],
//     [47.23046, -122.44732], [47.23105, -122.4559], [47.23023, -122.46126],
//     [47.22681, -122.46362], [47.21683, -122.46321], [47.20404, -122.46143],
//     [47.18931, -122.4628], [47.17792, -122.46594], [47.17273, -122.4702],
//     [47.1595, -122.48358], [47.14756, -122.5039], [47.13959, -122.52025],
//     [47.12367, -122.54874], [47.10997, -122.57284], [47.10571, -122.5841],
//     [47.10307, -122.59346], [47.10027, -122.60695], [47.09417, -122.61974],
//     [47.08597, -122.65331], [47.07904, -122.68752], [47.07699, -122.69421],
//     [47.07357, -122.69984], [47.06835, -122.71355], [47.06809, -122.72645],
//     [47.06533, -122.75009], [47.05951, -122.79146], [47.05706, -122.80582],
//     [47.05158, -122.81499], [47.04702, -122.82267], [47.04566, -122.83723],
//     [47.04448, -122.84403], [47.04096, -122.85318], [47.04069, -122.86692],
//     [47.03659, -122.876], [47.03476, -122.88901], [47.02955, -122.89436],
//     [47.02512, -122.89929], [47.02346, -122.90408], [47.02075, -122.90645],
//     [47.01614, -122.90598]];  
function initMap() {
    $.ajax('http://localhost:3004/search').then(stuffThatComesBack => {
        console.log(stuffThatComesBack);
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 },
        });
        directionsRenderer.setMap(map);

        const onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        };
        document.getElementById("button").addEventListener("click", onChangeHandler);
        // document.getElementById("end").addEventListener("change", onChangeHandler);
        const polyCoords = polyPoints(stuffThatComesBack[0]);
        const polyBound = new google.maps.Polygon({
            paths: polyCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });
        //to hide polygon set strokeOpacity and fillColor = 0
        // polyBound.setMap(map);
        console.log(polyBound);
        console.log("this is the stuff that comes back" , stuffThatComesBack[0]);
        polyBound.setMap(map);
    
    const service = new google.maps.places.PlacesService(map);
    for (let i = 0; i < stuffThatComesBack[0].length; i += 40) {
        service.nearbySearch({
            location: { lat: stuffThatComesBack[0][i][0], lng: stuffThatComesBack[0][i][1] },
            radius: '20000',
            type: ['brewery']
        }, callback);
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    new google.maps.Marker({
                        position: results[i].geometry.location,
                        map,
                        title: "Hello World!"
                    });
                }
            }
        }
    }
})
}
                function calculateAndDisplayRoute(directionsService, directionsRenderer) {
                    directionsService.route(
                        {
                            origin: {
                                query: document.getElementById("departure").value,
                            },
                            destination: {
                                query: document.getElementById("arrival").value,
                            },
                            travelMode: google.maps.TravelMode.DRIVING,
                        },
                        (response, status) => {
                            if (status === "OK") {
                                directionsRenderer.setDirections(response);
                                console.log(response);

                            } else {
                                window.alert("Directions request failed due to " + status);
                            }
                        }
                    );

                }


                function polyArray(latitude) {
                    const R = 6378137;
                    const pi = 3.14;
                    //distance in meters
                    const upper_offset = 15000;
                    const lower_offset = -15000;
                    const lat_up = upper_offset / R;
                    const lat_down = lower_offset / R;
                    //OffsetPosition, decimal degrees
                    const lat_upper = latitude + (lat_up * 180) / pi;
                    const lat_lower = latitude + (lat_down * 180) / pi;
                    // console.log(lat_lower);
                    return [lat_upper, lat_lower];
                }


                function polyPoints(arr) {
                    let upperBound = [];
                    let lowerBound = [];
                    for (let i = 0; i <= arr.length - 1; i++) {
                        let newPoints = polyArray(arr[i][0]);
                        upperBound.push({ lat: newPoints[0], lng: arr[i][1] });
                        lowerBound.push({ lat: newPoints[1], lng: arr[i][1] });
                    }
                    let reversebound = lowerBound.reverse();
                    let fullPoly = upperBound.concat(reversebound);
                    return fullPoly;
                }

