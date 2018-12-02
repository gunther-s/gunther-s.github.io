/* *************************************
*  Weather Site JavaScript Functions
************************************* */

console.log('My javascript is being read.');

// Variables for Function Use
const temp = 31;
const speed = 5;
buildWC(speed, temp);
const direction = "SW"; //Set your own value
windDial(direction);
let bImage ="snowstorm";
getCondition(bImage);
let sumImage = getCondition(bImage);
changeSummaryImage(sumImage);


function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc)

wc = Math.floor(wc);

wc = (wc > temp)?temp:wc;

console.log(wc);
feelTemp.innerHTML = wc;
}

// Make the wind dial
function windDial(direction){
    const dial = document.getElementById("pointer");
    console.log(direction);
    switch (direction){
     case "North":
     case "N":
      dial.setAttribute("class", "n");
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


function getCondition(bImage) {
    // let curWeather = document.getElementById("curWeather");
    console.log(bImage);

    switch (bImage){
        case "clear":
        case "sunny":
        case "nice":
        bImage = "clear";
         break;

        case "clouds":
        case "cloudy":
        case "partly cloudy":
        bImage = "clouds";
         break;

         case "fog":
        case "foggy":
        case "misty":
        bImage = "fog";
         break;

         case "rain":
         case "rainy":
        case "overcast":
        case "thunderstorms":
        case "stormy":
        case "drizzle":
        case "pouring":
        case "wet":
        bImage = "rain";
         break;

         case "snow":
        case "snowy":
        case "cold":
        case "blizzard":
        case "freezing":
        case "flurry":
        case "icy":
        case "snowstorm":
        bImage = "snow";
         break;
    }
    console.log(bImage);
    return bImage;
}


function changeSummaryImage(sumImage) {
    console.log(sumImage);

    switch (sumImage){
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
    console.log(sumImage);
}


function getCode(LOCALE) {
    const API_KEY = 'jl3ZjzfRcdwL7C2n92MtfkTFv2QoLrtJ';
    const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='+API_KEY+'&q='+LOCALE;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getCode function:');
      console.log(data);
      const locData = {}; 
      locData['key'] = data.Key; 
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getCode error: ', error))
  } 



function getWeather(locData) {
    const API_KEY = 'jl3ZjzfRcdwL7C2n92MtfkTFv2QoLrtJ';
    const CITY_CODE = locData['key']; 
    const URL = "https://dataservice.accuweather.com/currentconditions/v1/"+CITY_CODE+"?apikey="+API_KEY+"&details=true";
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getWeather function:');
      console.log(data); 
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
  } 





function getHourly(locData) {
    const API_KEY = 'jl3ZjzfRcdwL7C2n92MtfkTFv2QoLrtJ';
    const CITY_CODE = locData['key'];
    const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/"+CITY_CODE+"?apikey="+API_KEY;
    fetch(URL)
    .then(response =>
    response.json())
    .then(function (data)
    {
    console.log('Json object from getHourly function:');
    console.log(data);
    let date_obj = new
    Date(data[0].DateTime);
    let nextHour = date_obj.getHours();
    locData["nextHour"] = nextHour;
    var i = 1;
    data.forEach(function (element)
    {
    let temp =
    element.Temperature.Value;
    let hour =
    'hourTemp' + i;
    locData[hour] =
    temp; 
    let hiTemp = locData.pastHigh;
    let lowTemp =
    locData.pastLow;
    if(temp >
    hiTemp){
    hiTemp = temp;
    } else if (temp < lowTemp){
    lowTemp = temp;
    }
    if(hiTemp !=
    locData.pastHigh){
    locData["pastHigh"] =
    hiTemp;
    }
    if(lowTemp !=
    locData.pastLow){
    locData["pastLow"] =
    lowTemp;
    }
    i++; 
    });
    console.log('Finished locData object and data:');
    console.log(locData);
    buildPage(locData); 
    })
    .catch(error =>
    console.log('There was an error: ', error))

}






function buildPage(locData){
    let temp = locData.currentTemp;
    let speed = locData.speed;

    buildWC(speed, temp);
    windDial(locData.windDirection);
    let sumImage = getCondition(locData.summary);
    getCondition(sumImage);


    document.getElementById("locName").innerHTML = locData.name + ", " + locData.state;
    document.getElementById("zip").innerHTML = locData.postal;
    document.getElementById("elevation").innerHTML = locData.elevation;
    document.getElementById("geoposition").innerHTML = locData.geoposition;
    document.title = locData.name + ", " + locData.stateAbbr + " | Weather Site";
    

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
        document.getElementById((i + "")).innerHTML = time + " " + hourly[i - 1] + "&#8457;";
        time++;
    }
    document.getElementById("page-main").setAttribute("class", "show");
    document.getElementById("status").setAttribute("class", "hide");
    


}