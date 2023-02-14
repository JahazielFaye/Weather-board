let searchba = document.querySelector(".search_weather");
let city = document.querySelector('.city_weather');
let day = document.querySelector('.weather_day');
let humidity = document.querySelector('.weather_indicator--humidity>.value');
let pressure = document.querySelector('.weather_indicator--pressure>.value');
let wind = document.querySelector('.weather_indicator--wind>.value');
let image = document.querySelector(".weather_image");
let temperature = document.querySelector('.weather_temperature>.value');
let forecastBlock = document.querySelector(".weather_forecast");
let suggestions = document.querySelector("#suggestions");
let weatherAPIKey = "0241c01f3784a713363c767ae4ed4108";
let weatherBaseEndpoint =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
  weatherAPIKey;
let forecastBaseEndpoint =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" +
  weatherAPIKey;
let cityBaseEndpoint = "https://api.teleport.org/api/cities/?search=";

let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
  }

  searchba.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13) {
      let weather = await getWeatherByCityName(searchba.value);
      updateCurrentWeather(weather);
    }
  })

  let updateCurrentWeather = (data) => {
    console.log(data)
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidty;
    pressure.textContent = data.main.pressure;
    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135) {
      windDirection = 'East';
    } else if(deg > 135 && deg <= 225) {
      windDirection = 'South';
    } else if(deg > 225 && deg <= 315) {
      windDirection = 'West';
    } else {
      windDirection = 'North';
    }
    wind.textContent = windDirection + ', ' + data.wind.speed;
    temperature.textContent = data.main.temp > 0 ? 
                              '+' + Math.round(data.main.temp) : 
                                 Math.round(data.main.temp);
  }
  
  let dayOfWeek = () => {
   return new Date().toLocaleDateString('en-EN', {'weekday': 'long'});
  }

 