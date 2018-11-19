/* *************************************
*  Weather Site JavaScript Functions
************************************* */

// Variables for Function Use
const temp = 31;
const speed = 5;
buildWC(speed, temp);
const direction = "N"; //Set your own value
windDial(direction);
let bImage ="snowstorm";
getCondition(bImage);
let sumImage = getCondition(bImage);
changeSummaryImage(sumImage);

//Calculate a wind chill temperature
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');


// Compute the windchill
let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
console.log(wc)

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
    const dial = document.getElementById("pointer");
    console.log(direction);
    // Determine the dial class
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


// Change variable value of bImage to a matching phrase
function getCondition(bImage) {
    // let curWeather = document.getElementById("curWeather");
    console.log(bImage);

    switch (bImage){
        case "clear":
        case "sunny":
        case "nice":
        bImage = "clear";
        //  curWeather.setAttribute("class", "clear");
         break;
         case "clouds":
        case "cloudy":
        case "partly cloudy":
        bImage = "clouds";
        //  curWeather.setAttribute("class", "clouds");
         break;
         case "fog":
        case "foggy":
        case "misty":
        bImage = "fog";
        //  curWeather.setAttribute("class", "fog");
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
        //  curWeather.setAttribute("class", "rain");
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
        //  curWeather.setAttribute("class", "snow");
         break;
    }
    console.log(bImage);
    return bImage;
}
// change matching phrase to an image and return image
function changeSummaryImage(sumImage) {
    let curWeather = document.getElementById("curWeather");
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