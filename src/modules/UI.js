// UI module: control the DOM, update and assign event listeners
import extractWeatherData from "./DataFunctions";
import UnitConversion from "./UnitConversion";

const Unit = UnitConversion();

function createWeatherInfoPanel() {
  const infoPanel = document.createElement("div");
  infoPanel.classList.add("info-panel");
  infoPanel.id = "info-panel";

  const location = document.createElement("h2");
  location.classList = ["location"];
  const icon = document.createElement("img");
  icon.classList = ["icon"];
  const temp = document.createElement("p");
  temp.classList = ["temperature"];
  const cond = document.createElement("p");
  cond.classList = ["condition"];
  const feelslike = document.createElement("p");
  feelslike.classList = ["feels-like"];
  const desc = document.createElement("p");
  desc.classList = ["description"];

  infoPanel.append(location, icon, temp, cond, feelslike, desc);

  return infoPanel;
}

function createInputField() {
  const form = document.createElement("form");
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.required = true;
  inputField.placeholder = "Location";
  inputField.id = "location";
  inputField.name = "location";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Search";
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const locationInput = document.getElementById("location");
    console.log(locationInput.value);
    renderWeatherInfo(locationInput.value);
    // invoke loading animation
  });

  form.append(inputField, submitButton);

  return form;
}

function createUnitToggle() {
  const unitToggleButton = document.createElement("button");
  unitToggleButton.classList.add("unit-toggle");
  unitToggleButton.innerText = "°F/°C";
  unitToggleButton.addEventListener("click", (event) => {
    event.preventDefault();
    Unit.toggleUnit();
    console.log(Unit.isFarenheit());
    renderWeatherInfo(document.getElementById("location").value);
  });

  return unitToggleButton;
}

function renderWeatherInfo(location) {
  const loc = document.querySelector(".location");
  const icon = document.querySelector(".icon");
  const temp = document.querySelector(".temperature");
  const cond = document.querySelector(".condition");
  const feelslike = document.querySelector(".feels-like");
  const desc = document.querySelector(".description");

  extractWeatherData(location).then((data) => {
    loc.textContent = data.location;
    icon.src = `https://basmilius.github.io/weather-icons/production/fill/all/${data.currentConditions.icon}.svg`;
    icon.alt = data.currentConditions.conditions;
    temp.textContent = `${Unit.isFarenheit() ? data.currentConditions.temp : Unit.toCelsius(data.currentConditions.temp)} °${Unit.isFarenheit() ? "F" : "C"}`;
    cond.textContent = data.currentConditions.conditions;
    feelslike.textContent = `Feels like: ${Unit.isFarenheit() ? data.currentConditions.feelslike : Unit.toCelsius(data.currentConditions.feelslike)} °${Unit.isFarenheit() ? "F" : "C"}`;
    desc.textContent = `${data.currentConditions.description}`;
  });
}

export default function renderPage() {
  const body = document.querySelector("body");
  body.append(createInputField(), createWeatherInfoPanel(), createUnitToggle());
}
