function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let currentDate = now.getDate();
  let year = now.getFullYear();
  return `${day} ${hours}:${minutes}, ${month} ${currentDate}, ${year}`;
}
let element = document.querySelector("#current-date");
let now = new Date();
element.innerHTML = formatDate(now);

function showWeather(response) {
  let currentSity = document.querySelector("#current-city");
  currentSity.innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusTemp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "83ae76490ea870881878c9f9a41581ff";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  //
  axios.get(apiUrl).then(showWeather);
}

function submitSity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-sity").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "83ae76490ea870881878c9f9a41581ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let celsiusTemp = null;
let form = document.querySelector("#button-addon1");
form.addEventListener("click", submitSity);
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Feature change Celsius to Fahrenheit
function changeCelsius(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#temperature");
  temperatureC.innerHTML = Math.round(celsiusTemp);
}
function changeFahrenheit(event) {
  event.preventDefault();
  let temperatureF = document.querySelector("#temperature");
  temperatureF.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

let celsius = document.querySelector("#c-link");
celsius.addEventListener("click", changeCelsius);
let fahrenheit = document.querySelector("#f-link");
fahrenheit.addEventListener("click", changeFahrenheit);
//
searchCity("Kyiv");
