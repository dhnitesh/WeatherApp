const currentDate = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = days[currentDate.getDay()];
const date = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
const currentTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
const amOrPm = currentTime.slice(-2);

const day_image = 'day.jpg';
const night_image = 'night.jpg';

if (amOrPm === 'AM') {
document.body.style.backgroundImage = `url(${day_image})`;
} else {
document.body.style.backgroundImage = `url(${night_image})`;
}

document.getElementById('today').innerText = `${day}, ${date} ${currentTime}`;

const cloud_image = 'cloudy.png';
const sun_image = 'sun.png';
const rain_image = 'rain.png';
const API_KEY = 'a9c001c6a7b8dc2d8044a547c5fac590';
const search = document.getElementById('search');
const cityName = document.getElementById('city_name');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
search.addEventListener('click', () => {
  const city = document.querySelector('input').value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      cityName.innerText = data.name;
      temp.innerText = `${Math.round(data.main.temp - 273.15)}°C / ${Math.round((data.main.temp - 273.15) * 9/5 + 32)}°F`;
      humidity.innerText = `Humidity: ${data.main.humidity}%`;
      wind.innerText = `Wind: ${data.wind.speed} km/h`;
      console.log(data.weather[0].main);
      if (data.weather[0].main === 'Clouds') {
        document.getElementById('weather_image').src = cloud_image;
      } else if (data.weather[0].main === 'Clear') {
        document.getElementById('weather_image').src = sun_image;
      } else if (data.weather[0].main === 'Rain') {
        document.getElementById('weather_image').src = rain_image;
      }
      else if ( data.weather[0].main === 'Thunderstorm') {
        document.getElementById('weather_image').src = 'thunderstorm.png';
      }
      
    });
});