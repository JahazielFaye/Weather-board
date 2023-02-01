let search = document.querySelector(".search_weather");
const city = document.querySelector('.city_weather');
const day = document.querySelector('.weather_day');
const humidity = document.querySelector('.weather__indicator--humidity .value');
const pressure = document.querySelector('.weather__indicator--pressure .value');
const wind = document.querySelector('.weather__indicator--wind .value');
const temperature = document.querySelector('.weather_temperature .value');
let image = document.querySelector(".weather_image");
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

let city_weather = async (city) => {
    let cityString = city;
    if (cityString.includes(", ")) {
      city =
        cityString.substring(0, cityString.indexOf(", ")) +
        cityString.substring(cityString.lastIndexOf(", "));
    } else {
      city = cityString;
    }
  
    let endpoint = weatherBaseEndpoint + "&q=" + city;
    let response = await fetch(endpoint);
    if (response.status !== 200) {
      alert("City not found!");
      return;
    }
    let weather = await response.json();
    return weather;
  };
  
  let getForecastByCityID = async (id) => {
    let endpoint = forecastBaseEndpoint + "&id=" + id;
    let result = await fetch(endpoint);
    let forecast = await result.json();
    let forecastList = forecast.list;
    let daily = [];
  
    forecastList.forEach((day) => {
        if (typeof day.dt_text === 'string') {
          let date = new Date(day.dt_text.replace(" ", "T"));
          let hours = date.getHours();
          if (hours === 12) {
            daily.push(day);
          }
        }
      });
      
    return daily;
  };
  function updateForecast(forecast) {
    let city_weather = async (city) => {
        let weather = await getWeatherByCity(city);
        if (!weather) {
          return;
        }
        let cityID = weather.id;
        updateCurrentWeather(weather);
        let forecast = await getForecastByCityID(cityID);
        updateForecast(forecast);
      };
  }
  
  let init = () => {};
  
  search.addEventListener("keydown", async (e) => {
    if (e.keyCode === 13) {
      city_weather(search.value);
    }
  });
  
  search.addEventListener("input", async () => {
    let endpoint = cityBaseEndpoint + search.value;
    let result = await (await fetch(endpoint)).json();
    suggestions.innerHTML = "";
    let cities = result._embedded["city:search-results"];
    let length = cities.length > 5 ? 5 : cities.length;
    for (let i = 0; i < length; i++) {
      let option = document.createElement("option");
      option.value = cities[i].matching_full_name;
      suggestions.appendChild(option);
    }
    console.log(result);
  });
  
  let updateCurrentWeather = (data) => {
    city.textContent = data.name + ", " + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    let windDirection;
    let deg = data.wind.deg;
    if (deg > 45 && deg <= 135) {
      windDirection = "East";
    } else if (deg > 135 && deg <= 225) {
      windDirection = "South";
    } else if (deg > 225 && deg <= 315) {
      windDirection = "West";
    } else {
      windDirection = "North";
    }
    wind.textContent = windDirection + ", " + data.wind.speed;
    temperature.textContent =
      data.main.temp > 0
        ? "+" + Math.round(data.main.temp)
        : Math.round(data.main.temp);
  };
  
  let dayOfWeek = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
  };