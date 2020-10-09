/*
 * fil: js.js
 * purpose: introdction to jQuery
 */
console.log('file: js/js.js loaded');

// A $( document ).ready() block.
$(document).ready(function () { // kører så snart DOM er klar

    console.log("jQuery 3.5.1 running.");

    // ... din kode herfra ...

    /*mapboxgl.accessToken = 'pk.eyJ1IjoibWFyYnByb2R1Y3Rpb24iLCJhIjoiY2tmcWtobGNlMGY2cDJ4b2Z4MjZjZWdqOSJ9.dvNEnmabk01ePVy53RaDYA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/marbproduction/ckfxrs2lk0j4c19qr473pth5z',
        center: [10.20855, 56.15222],
        zoom: 12
    });*/


    //placing a custom interactiv map, with a marker on a specific location

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFyYnByb2R1Y3Rpb24iLCJhIjoiY2tmcWtobGNlMGY2cDJ4b2Z4MjZjZWdqOSJ9.dvNEnmabk01ePVy53RaDYA';
    var mapboxClient = mapboxSdk({
        accessToken: mapboxgl.accessToken
    });
    mapboxClient.geocoding.forwardGeocode({
            query: 'Ravnsbjerg Kollegiet, Aarhus, Denmark',
            autocomplete: false,
            limit: 1
        })
        .send().then(function (response) {
            if (
                response &&
                response.body &&
                response.body.features &&
                response.body.features.length
            ) {
                var feature = response.body.features[0];

                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/marbproduction/ckfxrs2lk0j4c19qr473pth5z',
                    center: feature.center,
                    zoom: 10
                });
                new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
            }
        });


    //Placing a weather forecast for Aarhus Denmark

    const token = "20cd15e801b4b114a3580783e9049d3c"; // save your token in this variable

    const aarhus = "https://api.openweathermap.org/data/2.5/weather?q=Aarhus,DK&units=metric&lang=da&appid=" + token;

    // get the weather data
    fetch(aarhus).then(response => {
        return response.json();
    }).then(data => {

        // Work with JSON data here
        console.log(data); // show what's in the json

        $('#weather').append(
            '<div class="weatherInfo">' +
            data.weather[0].description +
            ' i ' +
            data.name +
            '<figure><img src="http://openweathermap.org/img/w/' +
            data.weather[0].icon +
            '.png" alt="' +
            data.weather[0].description +
            '"></figure>' +
            '</div>');

        $('#weather').css("font-size", "1em");

        // here are the icons: https://openweathermap.org/weather-conditions 

    }).catch(err => {
        // Do something for an error here
        console.log('There was an error ...');
    });

    // ... din kode slut ...

}); // denne line må ikke slettes
