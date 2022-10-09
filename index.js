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
function formatDay(timesTemp) {
  let date = new Date(timesTemp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForekast(response) {
  console.log(response.data);
  let forecast = response.data.list;

  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<table >`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<tr>
    <td class="day">${formatDay(forecastDay.dt)}</td>
    <td class="sky">
    ${
      forecastDay.weather[0].description
    } <br /><span id="forcast-temp=1">${Math.round(
          forecastDay.main.temp_max
        )}°</span>
      <strong>${Math.round(forecastDay.main.temp_min)}°</strong>
    </td>
    <td > <img class="emoji"src= "http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"/>
    </td>
  </tr>`;
    }
  });

  forecastHtml = forecastHtml + `</table>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "83ae76490ea870881878c9f9a41581ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForekast);
}
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

  getForecast(response.data.coord);
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

let element = document.querySelector("#current-date");
let now = new Date();
element.innerHTML = formatDate(now);
let celsiusTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSity);
let form2 = document.querySelector("#button-addon1");
form2.addEventListener("click", submitSity);
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
