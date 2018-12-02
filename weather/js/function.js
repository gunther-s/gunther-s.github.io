/* *************************************
*  Weather Site JavaScript Functions
************************************* */

// // Variables for Function Use
// const temp = 55;
// const speed = 5;
// buildWC(speed, temp);
// const direction = "SW"; //Set your own value
// windDial(direction);
// let bImage = "rain";
// let sumImage = getCondition(bImage);
// changeSummaryImage(sumImage);



// Calculate the Windchill
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
    
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;

    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
}


// Wind Dial Function
function windDial(direction){
    // Get the container
    const dial = document.getElementById("dial");
    console.log(direction);

    // Determine the dial class
    switch (direction){
     case "North":
     case "N":
      dial.setAttribute("class", "n"); //"n" is the CSS rule selector
      break;
     case "NE":
     case "NNE":
     case "ENE":
      dial.setAttribute("class", "ne");
      break;
     case "NW":
     case "NNW":
     case "WNW":
      dial.setAttribute("class", "nw");
      break;
     case "South":
     case "S":
      dial.setAttribute("class", "s");
      break;
     case "SE":
     case "SSE":
     case "ESE":
      dial.setAttribute("class", "se");
      break;
     case "SW":
     case "SSW":
     case "WSW":
      dial.setAttribute("class", "sw");
      break;
     case "East":
     case "E":
      dial.setAttribute("class", "e");
      break;
     case "West":
     case "W":
      dial.setAttribute("class", "w");
      break;
    }
}



//Background Image Function
/*function getCondition(bImage) {
    //get the container
    const curWeather = document.getElementById("curWeather");
    console.log(bImage);

    //Determin the curWeather class
    switch(bImage) {
        case "clear":
        case "sunny":
        case "nice":
        curWeather.setAttribute("class", "clear");
        //"clear" is the CSS rule selector
        break;
        case "cloudy":
        case "partly cloudy":
        case "clouds":
        case "overcast":
        curWeather.setAttribute("class", "clouds");
        break;
        case "fog":
        case "foggy":
        case "misty":
        case "gloomy":
        curWeather.setAttribute("class", "fog");
        break;
        case "rainy":
        case "rain":
        case "stormy":
        case "thunderstorms":
        case "drizzle":
        case "pouring":
        case "wet":
        case "moist":
        curWeather.setAttribute("class", "rain");
        break;
        case "snow":
        case "snowy":
        case "cold":
        case "blizzard":
        case "freezing":
        case "flurries":
        case "icy":
        case "snow stroms":
        curWeather.setAttribute("class", "snow");
        break;
    }
}*/


function getCondition(bImage) {

    //get the container
    console.log(bImage);

    //Determin the curWeather class
    switch(bImage) {
        case "clear":
        case "sunny":
        case "nice":
        bImage = "clear";
        break;
        case "cloudy":
        case "partly cloudy":
        case "clouds":
        case "overcast":
        bImage = "clouds";
        break;
        case "fog":
        case "foggy":
        case "misty":
        case "gloomy":
        bImage = "fog";
        break;
        case "rainy":
        case "rain":
        case "stormy":
        case "thunderstorms":
        case "drizzle":
        case "pouring":
        case "wet":
        case "moist":
        bImage = "rain";
        break;
        case "snow":
        case "snowy":
        case "cold":
        case "blizzard":
        case "freezing":
        case "flurries":
        case "icy":
        case "snow stroms":
        bImage = "snow";
        break;
    }
    return bImage;
}

function changeSummaryImage(sumImage) {
    console.log(sumImage);

    switch(sumImage) {
        case "clear":
        curWeather.setAttribute("class", "clear");
        break;
        case "clouds":
        curWeather.setAttribute("class", "clouds");
        break;
        case "fog":
        curWeather.setAttribute("class", "fog");
        break;
        case "rain":
        curWeather.setAttribute("class", "rain");
        break;
        case "snow":
        curWeather.setAttribute("class", "snow");
        break;
    }
}

// Get location code from API
function getCode(LOCALE) {
    const API_KEY = 'arJn7hbGfL3e0IPO8QQEJ6AoaozeGogi';
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


   // Get Current Weather data from API
function getWeather(locData) {
    const API_KEY = 'arJn7hbGfL3e0IPO8QQEJ6AoaozeGogi';
    const CITY_CODE = locData['key']; // We're getting data out of the object
    const URL = "https://dataservice.accuweather.com/currentconditions/v1/"+CITY_CODE+"?apikey="+API_KEY+"&details=true";
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getWeather function:');
      console.log(data); // Let's see what we got back
      // Start collecting data and storing it
      locData['currentTemp'] = data[0].Temperature.Imperial.Value;
      locData['summary'] = data[0].WeatherText;
      locData['windSpeed'] = data[0].Wind.Speed.Imperial.Value;
      locData['windUnit'] = data[0].Wind.Speed.Imperial.Unit;
      locData['windDirection'] = data[0].Wind.Direction.Localized;
      locData['windGust'] = data[0].WindGust.Speed.Imperial.Value;
      locData['pastLow'] = data[0].TemperatureSummary.Past12HourRange.Minimum.Imperial.Value;
      locData['pastHigh'] = data[0].TemperatureSummary.Past12HourRange.Maximum.Imperial.Value;
      getHourly(locData); // Send data to getHourly function
      })
     .catch(error => console.log('There was an error: ', error))
  } // end getWeather function




  // Get next 12 hours of forecast data from API

function getHourly(locData) {
    const API_KEY = 'arJn7hbGfL3e0IPO8QQEJ6AoaozeGogi';
    const CITY_CODE = locData['key'];
    const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/"+CITY_CODE+"?apikey="+API_KEY;
    fetch(URL)
    .then(response =>
    response.json())
    .then(function (data)
    {
    console.log('Json object from getHourly function:');
    console.log(data); //See what we got back
    // Get the first hour in the returned data
    let date_obj = new
    Date(data[0].DateTime);
    let nextHour = date_obj.getHours();
    // returns 0 to 23
    // Store into the object
    locData["nextHour"] = nextHour;
    // Counter for the forecast hourly temps
    var i = 1;
    // Get the temps for the next 12 hours
    data.forEach(function (element)
    {
    let temp =
    element.Temperature.Value;
    let hour =
    'hourTemp' + i;
    locData[hour] =
    temp; // Store hour and temp to object
    // New hiTemp variable, assign value from previous 12 hours
    let hiTemp = locData.pastHigh;
    // New lowTemp variable, assign value from previous 12 hours
    let lowTemp =
    locData.pastLow;
    // Check current forecast temp to see if it is 
    // higher or lower than previous hi or low
    if(temp >
    hiTemp){
    hiTemp = temp;
    } else if (temp < lowTemp){
    lowTemp = temp;
    }
    // Replace stored low hi and low temps if they changed
    if(hiTemp !=
    locData.pastHigh){
    locData["pastHigh"] =
    hiTemp; // When done, this is today's high temp
    }
    if(lowTemp !=
    locData.pastLow){
    locData["pastLow"] =
    lowTemp; // When done, this is today's low temp
    }
    i++; // Increase the counter by 1
    }); // ends the foreach method
    console.log('Finished locData object and data:');
    console.log(locData);
    buildPage(locData); // Send data to buildPage function
    })
    .catch(error =>
    console.log('There was an error: ', error))

} // end getHourly function




// Populate the current location weather page

function buildPage(locData){
    // Task 1 - Feed data to WC, Dial and Image functions
    let temp = locData.currentTemp;
    let speed = locData.speed;

    buildWC(speed, temp);
    windDial(locData.windDirection);
    let sumImage = getCondition(locData.summary);
    getCondition(sumImage);

    // Task 2 - Populate location information

    document.getElementById("locName").innerHTML = locData.name + ", " + locData.state;
    document.getElementById("zip").innerHTML = locData.postal;
    document.getElementById("elevation").innerHTML = locData.elevation;
    document.getElementById("geoposition").innerHTML = locData.geoposition;
    document.title = locData.name + ", " + locData.stateAbbr + " | Weather Site";
    
    // Task 3 - Populate weather information

    document.getElementById("currentTemp").innerHTML = locData.currentTemp + "&#8457;";
    document.getElementById("h").innerHTML = locData.pastHigh + "&#8457;";
    document.getElementById("l").innerHTML = locData.pastLow + "&#8457;";
    document.getElementById("wind-speed").innerHTML = locData.windSpeed + " mph";
    document.getElementById("gusts").innerHTML = locData.windGust;
    document.getElementById("direction").innerHTML = "Direction: " + locData.windDirection;
    document.getElementById("rainHead").innerHTML = locData.summary;

    let time = locData.nextHour;
    let hourly = [locData.hourTemp1, locData.hourTemp2, locData.hourTemp3, locData.hourTemp4, locData.hourTemp5, locData.hourTemp6, locData.hourTemp7, locData.hourTemp8, locData.hourTemp9, locData.hourTemp10, locData.hourTemp11, locData.hourTemp12];

    for (var i = 1; i <= 12; i++) {
        if (time > 12) {
            time -= 12;
        }
        document.getElementById((i + "")).innerHTML = time + ": " + hourly[i - 1] + "&#8457;";
        time++;
    }
    
    document.getElementById("page-main").setAttribute("class", "show");
    document.getElementById("status").setAttribute("class", "hide");
}