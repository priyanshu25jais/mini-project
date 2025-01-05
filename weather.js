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
const recommendationText = document.getElementById("recommendationText");

const WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?appid=bbbbb2307745e1d93475723380f32246&units=metric&q=';

function findUserLocation() {
  fetch(WEATHER_API_ENDPOINT + userLocation.value)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert(data.message);
        return;
      }
      console.log(data);
      // Display city and country
      city.innerHTML = `${data.name}, ${data.sys.country}`;

      // Weather icon
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

      // Convert visibility from meters to kilometers
      const visibilityInKm = data.visibility / 1000;
      UVValue.innerHTML = `${visibilityInKm.toFixed(1)} km`;

      // Clouds
      CValue.innerHTML = `${data.clouds.all}%`;

      // Weather recommendations
      const weatherConditions = data.weather[0].main.toLowerCase();
      const temp = data.main.temp;

      if (temp < 10) { 
        recommendationText.innerHTML = "🥶 Extreme cold! Wear very warm clothes and stay indoors if possible!"; 
      }
      else if (temp < 20) {
        recommendationText.innerHTML = "❄️ It's cold outside. Wear warm clothes!";
      }
      else if (temp >= 40) {
        recommendationText.innerHTML = "🔥 Extreme heat! Stay hydrated and avoid going out in the sun!";
      }
      else if (temp >= 30 || weatherConditions.includes("clear")) { 
        recommendationText.innerHTML = "☀️ It's hot outside. Make sure to drink plenty of water!";
      }
      else if (weatherConditions.includes("rain")) {
        recommendationText.innerHTML = "🌧️ It's raining outside. Don't forget your raincoat and umbrella!"; 
      } 
      else if (weatherConditions.includes("smoke")) {
        recommendationText.innerHTML = "🚫 Avoid outdoor activities. Keep windows and doors closed to avoid smoke inhalation. Use air purifiers indoors if possible.";
      }
      else if (weatherConditions.includes("cloudy")) {
        recommendationText.innerHTML = "☁️ It's cloudy. Perfect weather for a walk or jog; don't forget a light jacket."; 
      } 
      else if (weatherConditions.includes("fog")) {
        recommendationText.innerHTML = "🌫️ Drive carefully; turn on your fog lights. Avoid outdoor exercise; fog can increase respiratory issues.";
      }
      else {
       recommendationText.innerHTML = "😊 Weather is fine!";
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
