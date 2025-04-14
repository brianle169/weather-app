const WEATHER_API_KEY = "TQLLVSDU3ZFREU4M9WZT6LARG";
const WEATHER_API_ROOT =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

async function fetchWeatherData(loc) {
  let weatherData;
  try {
    const response = await fetch(
      `${WEATHER_API_ROOT}${loc}?key=${WEATHER_API_KEY}`,
      {
        mode: "cors",
      },
    );
    weatherData = await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error();
  }
  return weatherData;
}

export default async function extractWeatherData(location) {
  const data = await fetchWeatherData(location);
  console.log(data);
  return {
    location: data.resolvedAddress,
    currentConditions: {
      temp: data.currentConditions.temp,
      feelslike: data.currentConditions.feelslike,
      conditions: data.currentConditions.conditions,
      description: data.description,
      icon: data.currentConditions.icon,
    },
  };
}
