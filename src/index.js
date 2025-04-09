// Project code goes below here.
import "./style.css";

const WEATHER_API_KEY = "TQLLVSDU3ZFREU4M9WZT6LARG";
const weather_api_root =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

// fetch data from api
async function fetchWeatherData(loc) {
  const response = await fetch(
    `${weather_api_root}${loc}?key=${WEATHER_API_KEY}`,
    {
      mode: "cors",
    },
  );
  const weatherData = await response.json();
  return weatherData;
}
