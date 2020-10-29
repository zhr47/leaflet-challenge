// urls that data comes from
day_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
console.log(day_url);
week_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(week_url);
month_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
console.log(week_url);

// map object
var myMap = L.map("map", {
  center: [38.51073, -96.4247], zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Color of circles
function chooseColor(magnitude) 
{
switch (true) 
{
case magnitude > 5:
  return "pink";
case magnitude > 4:
  return "blue";
case magnitude > 3:
  return "orange";
case magnitude > 2:
  return "purple";
case magnitude > 1:
  return "cyan";
default:
  return "red";
}
}

// Define function of radius based on magnitude
function radiusSize(magnitude) 
{
return magnitude * 3;
}

function styleInfo(feature) 
{
return {
  opacity: 1,
  fillOpacity: 1,
  fillColor: chooseColor(feature.properties.mag),
  color: "#000000",
  radius: radiusSize(feature.properties.mag),
  stroke: true,
  weight: 0.5
};
}

// Grabbing our GeoJSON data..
d3.json(month_url).then(function(data)
{
  console.log(data)
L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng) 
},
style: styleInfo, 

// Getting  feature
onEachFeature: function(feature, layer) 
{
// GeoJSON layer with the retrieved data
  layer.bindPopup("<h4> Location: " + feature.properties.place + "</h4> <hr> <h5> Magnitude: " + feature.properties.mag + "</h5>");
},
}).addTo(myMap);

});