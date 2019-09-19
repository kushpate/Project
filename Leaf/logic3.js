//Base layer
  var lightmap= L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

//Country Data
var country_data = [{
    name: "United States",
    location: [37.0902, -95.7129],
    lifeexp:  78.24,
    GDP:[42951.65],
    Population: [301139947]
  },
  {
      name: "China",
      location: [35.8617, 104.1954],
      lifeexp:  72.96,
      GDP:[4959.11],
      Population:[1318683096]
  },
  {
      name:"India",
      location: [20.5937, 78.9629],
      lifeexp:  64.69,
      GDP:[2452.21],
      Population:[1110396331]
  }
];

//Define arrays to hold various country data circles
var countryCirclesLExp = [];
var countryCirclesGDP = [];
var countryCirclesPop = [];

for(var i=0; i<country_data.length;i++){
    var color="";
    if(country_data[i].lifeexp >75){
      color = "green";
    }
    else if(country_data[i].lifeexp>70){
      color='blue';
    }
    else {
      color='red';
    }
    countryCirclesLExp.push(
      L.circle(country_data[i].location,{
        stroke:false,
        fillOpacity:.75,
        color:"black",
        fillColor:color,
        radius:country_data[i].lifeexp*16000
      }).bindPopup("<h1>"+country_data[i].name+"</h1> <hr> <h3>Life Expectancy: " + country_data[i].lifeexp + "</h3>")
    );

    countryCirclesGDP.push(
      L.circle(country_data[i].location,{
        stroke:false,
        fillOpacity:.75,
        color:"black",
        fillColor:color,
        radius:country_data[i].GDP*100
      }).bindPopup("<h1>"+country_data[i].name+"</h1> <hr> <h3>GDP: " + country_data[i].GDP + "</h3>")
    );

    countryCirclesPop.push(
      L.circle(country_data[i].location,{
        stroke:false,
        fillOpacity:.75,
        color:"black",
        fillColor:color,
        radius:country_data[i].Population *1/500
      }).bindPopup("<h1>"+country_data[i].name+"</h1> <hr> <h3>Population: " + country_data[i].Population + "</h3>")
    );
}

//Create three separate layer groups for the cirles for:lifeExp,Pop,GDP
var LifeExpLayer = L.layerGroup(countryCirclesLExp);
var GDPLayer = L.layerGroup(countryCirclesGDP);
var PopLayer = L.layerGroup(countryCirclesPop);

//Create baseMaps object
var baseMaps ={
  "Light Map": lightmap,
  "Dark Map": darkmap
};

//Create overlay object
var overlayMaps ={
  "Country Life Expectancy": LifeExpLayer,
  "Country GDP": GDPLayer,
  "Country Population": PopLayer,
};

//Define map object
//Create map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 2,
  layers:[lightmap]
});

//Pass our map layers into layer control
//Add the layer control to the map
L.control.layers(baseMaps,overlayMaps,{
  collapsed:false
}).addTo(myMap);



