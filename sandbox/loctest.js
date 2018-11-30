//these functions will work together
'use strict';





// Gets longitude and latitude of current location
function getGeoLocation() {

} // end getGeoLocation

const STATUS = document.getElementById('status');
 STATUS.innerHTML = 'Getting Location...';

 // Call the function to get our location
getGeoLocation();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
     const LAT = position.coords.latitude;
     const LONG = position.coords.longitude;
  
     // Combine the values
     const LOCALE = LAT + "," + LONG;
     console.log(`Lat and Long are: ${LOCALE}.`);
    // Call getCode function, send locale
    getCode('https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=jl3ZjzfRcdwL7C2n92MtfkTFv2QoLrtJ&q=43.8165504%2C-111.7855744' + LOCALE);
    // Get location code from API
function getCode(LOCALE) {
    const API_KEY = 'jl3ZjzfRcdwL7C2n92MtfkTFv2QoLrtJ';
    const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='+API_KEY+'&q='+LOCALE;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getCode function:');
      console.log(data);
      const locData = {}; // Create an empty object
      locData['key'] = data.Key; // Add the value to the object
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getCode error: ', error))
  } // end getCode function
  
  
    })
   }
else {
    STATUS.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
    } // end else


//https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=jl3ZjzfRcdwL7C2n92MtfkTFv2QoLrtJ&q=43.8165504%2C-111.7855744