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
  .then( (json) => {displayCurrentWeather(json)} )
}

function displayCurrentWeather(json) {
  const currentTemp = json.main.temp
  //render current weather data to the DOM using provided IDs and json from API
  const tempContainer = document.getElementById('temp') 
  tempContainer.innerHTML = currentTemp
  const low = document.getElementById ("low")
  const high = document.getElementById("high")
  const humidity = document.getElementById('humidity')
  const cloudCover = document.getElementById('cloudCover')
  low.innerHTML= json.main.temp_min
  high.innerHTML= json.main.temp_max
  humidity.innerHTML= json.main.temp.humidity
  cloudCover.innerHTML= json.clouds.all
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city 
  fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + API_KEY + "&units=imperial")
  .then( (data) => {return data.json()} ) 
  .then( (json) => {displayFiveDayForecast(json)} )
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  console.log(json)
  const forecasts = json.list
  createChart(json)
  
  let startingString =''
  for (let forecast of forecasts){
    console.log(forecast)
    let divString = "<div> <p>" + forecast.main.temp_min + 
    "</p>" + "<p>" + forecast.main.temp_max  + "</p>" + 
    "<p>" + forecast.dt_txt + "</p> </div> "
    startingString += divString
  }
  const aside= document.getElementById('Weather')
  aside.innerHTML=startingString
}
function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
  const ctx = document.getElementById('WeatherChart').getContext('2d');
  
  const labels = json.list.map((forecast) => {return forecast.dt_txt})
  const values = json.list.map((forecast) => {return forecast.main.temp})
  new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: values,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit',handleFormSubmit)
})
