const API_KEY = "aec5e7f487c138f203e47fc0c39c3d49"

function handleFormSubmit(event) {
  //handle submit event
  // 1.grab the city they enterd in the text box
  event.preventDefault()
  const input = document.getElementById('city')
  const city = input.value
  fetchCurrentWeather(city)
  fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=imperial")
  .then( (data) => {return data.json()} ) 
  .then( (json) => {console.log(json)} )
}

function displayCurrentWeather(json) {
  const currentTemp=json.main.temp
  //render current weather data to the DOM using provided IDs and json from API
  const tempContainer = document.getElementById('temp') tempContainer.innerHTML = currentTemp

}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit',handleFormSubmit)
})
