let city = document.querySelector('.city_weather');
let day = document.querySelector('.weather_day');
let humidity = document.querySelector('.weather_indicator--humidty.>value');
let wind = document.querySelector('.weather_indicator--wind');
let pressure = document.querySelector('.weather_indicator--pressure');
let image = document.querySelector('.weather_image');
let temp = document.querySelector('.weather_temperature');
let weatherAPIKey = '0241c01f3784a713363c767ae4ed4108';
let weatherBase =''

let getWeatherByCity = async (city) => {
    let endpoint = weatherBaseEndPoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();

    console.log(weather);
}

getWeatherByCity('Florida');