

const userLocation = document.getElementById("userLocation");
const weatherIcon = document.querySelector(".weatherIcon");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feelsLike");
const description = document.querySelector(".description");
const date = document.querySelector(".date");
const city = document.querySelector(".city");
const HValue = document.querySelector(".HValue");
const WValue = document.querySelector(".WValue");
const SRValue = document.querySelector(".SRValue");
const SSValue = document.querySelector(".SSValue");
const CValue = document.querySelector(".cValue");
const UVValue = document.querySelector(".UVValue");
const PValue = document.querySelector(".PValue");

const WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?appid=bbbbb2307745e1d93475723380f32246&units=metric&q=';

function findUserLocation() {
  fetch(WEATHER_API_ENDPOINT + userLocation.value)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert(data.message);
        return;
      }
      console.log(data)
      // Display city and country
      city.innerHTML = `${data.name}, ${data.sys.country}`;

      // Weather icon
      // weatherIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
      weatherIcon.style.backgroundImage = `url("https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png")`;

      // Temperature and feels like
      temperature.innerHTML = `${data.main.temp}°C`;
      feelsLike.innerHTML = `Feels like ${data.main.feels_like}°C`;

      // Weather description
      description.innerHTML = data.weather[0].description;

      // Date
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      date.innerHTML = new Date(data.dt * 1000).toLocaleString("en-US", options);

      // Humidity, wind speed, and pressure
      HValue.innerHTML = `${data.main.humidity}%`;
      WValue.innerHTML = `${data.wind.speed} m/s`;
      PValue.innerHTML = `${data.main.pressure} hPa`;

      // Sunrise and sunset
      const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
      SRValue.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", timeOptions);
      SSValue.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", timeOptions);
     

      // UVValue.innerHTML=`${data.visibility}`
      // Convert visibility from meters to kilometers
const visibilityInKm = data.visibility / 1000;

// Update the UVValue with the visibility in kilometers
UVValue.innerHTML = `${visibilityInKm.toFixed(1)} km`; // Rounds to 1 decimal place


      // Clouds
      CValue.innerHTML = `${data.clouds.all}%`;
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
