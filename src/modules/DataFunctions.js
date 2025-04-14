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
    throw new Error(error);
  }
  return weatherData;
}

export default async function extractWeatherData(location) {
  let data;
  try {
    data = await fetchWeatherData(location);
  } catch (error) {
    throw new Error(error);
  }
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
