// const apiKey = process.env.API_KEY;
// console.log(apiKey); // Logs the API key from your .env file

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-button');
const weatherIcon = document.querySelector('#weather-icon');
const windSpeed = document.querySelector('#wind-speed');
const humidity = document.querySelector('.humidity');
const weather = document.querySelector('.weather');
const desc = document.querySelector('.desc');
const apiKey = '{Use you own API key!}';

// Set weather details based on data
const setWeatherDetails = (data) => {
  desc.innerHTML = data.weather[0].description;
  weather.innerHTML = Math.round(data.main.temp - 273.15) + '°C';
  humidity.innerHTML = data.main.humidity + '%';
  windSpeed.innerHTML = data.wind.speed + 'km/h';

  switch (data.weather[0].main) {
    case 'Clouds':
      weatherIcon.src = 'images/Clouds.png';
      break;
    case 'Clear':
      weatherIcon.src = 'images/sun.png';
      break;
    case 'Rain':
      weatherIcon.src = 'images/rainy.png';
      break;
    case 'Mist':
      weatherIcon.src = 'images/mist.png';
      break;
    case 'Snow':
      weatherIcon.src = 'images/snow.png';
      break;
    case 'Haze':
      weatherIcon.src = 'images/haze.png';
      break;
    default:
      console.log('No matching weather condition');
      weatherIcon.src = 'images/Clouds.png'; // Fallback image
      break;
  }
};

// Fetch weather data from OpenWeather API
const callApi = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        alert('Check spelling of City and try again or Something went Wrong!');
        throw new Error(`Request failed with Status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setWeatherDetails(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Event listener for search button click
searchBtn.addEventListener('click', (e) => {
  if (searchInput.value === '') {
    alert('Please enter City name');
  } else {
    callApi();
  }
});

// Event listener for pressing 'Enter' key in search input
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchBtn.click();
  }
});
