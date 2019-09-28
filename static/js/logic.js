const map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  
 const map2 = L.map("map", {
    center: [38.8254326,-97.7021555],
    zoom: 4
  });

  map.addTo(map2);

//Style for earthquake points - dynamic based on color and radius
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    function circle_style(feature) {
        console.log(feature)
        return{
            color: "black",
            fillColor: getColor(feature.properties.mag),
            opacity: 0.5,
            fillOpacity: 0.75,
            radius: getRadius(feature.properties.mag),
        }
        }

//Criteria for circle color
function getColor(magnitude) {
    switch (true) {
        case magnitude >= 5:
            return "dark red";
        case magnitude >= 4:
            return "red";
        case magnitude >= 3:
            return "orange";
        case magnitude >= 2:
            return "yellow";
        case magnitude >= 1:
            return "green";
        default:
            return "green";     
    }
}

//If magnitude is 0, return as 1 
function getRadius(magnitude) {
    if (magnitude === 0){
        return 1;
    }
    return magnitude * 5;
}

//Adding a geojson layer with circles
L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
    },
    style: circle_style
}).addTo(map2)

});