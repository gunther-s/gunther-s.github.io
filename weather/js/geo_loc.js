'use strict';
// https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=API-Key-Goes-Here&q=43.816667%2C-111.783333


getGeoLocation();





// Gets longitude and latitude of current location
function getGeoLocation() {

    const STATUS = document.getElementById('status');
    STATUS.innerHTML = 'Getting Location...';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const LAT = position.coords.latitude;
         const LONG = position.coords.longitude;

         const LOCALE = LAT + "," + LONG;
         console.log(`Lat and Long are: ${LOCALE}.`);

         getCode(LOCALE);
      
      
        })
       } else {
        STATUS.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       }
}