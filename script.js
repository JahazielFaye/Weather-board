//  Calling classes
let search = document.querySelector('.search_weather');
let city = document.querySelector('.city_weather');
let day = document.querySelector('.weather_day');
let humidity = document.querySelector('.weather_indicator--humidty>.value');
let wind = document.querySelector('.weather_indicator--wind>.value');
let pressure = document.querySelector('.weather_indicator--pressure>.value');
let image = document.querySelector('.weather_image');
let temp = document.querySelector('.weather_temperature>.value');
let weatherAPIKey = '0241c01f3784a713363c767ae4ed4108';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIKey;

// let getWeatherByCity = async (city) => {
//     let endpoint = weatherBase + '&q=' + city;
//     let response = await fetch(endpoint);
//     let weather = await response.json();
// return weather;
// }
// search.addEventListener('keydown', async (e) => {
//     if(e.keyCode === 13) {
//         let weather = await getWeatherByCity(search.value);
//         updateCurrentWeather(weather);
//     }
// })
// let updateCurrentWeather = (data) => {
// city.textContent = data.name + ', ' + data.sys.country;
// }



let getWeatherByCity = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();

    console.log(weather);
}
search.addEventListener('keydown' ,(e) =>{
    console.log(e);

})
// let updateCurrentWeather = (data) => {
//     city.textContent = data.name  + ', ' + data.sys.country;









// let userSearchInput = document.getElementById('User-search').value;

// search.addEventListener('click', function() {

//  let userSearchInput = document.getElementById('User-search').value;

// })

// city.textContent = userSearchInput + '  ' + 



// let getWeatherByCity = async (city) => {
//     let endpoint = weatherBase + '&q=' + city;
//     let response = await fetch(endpoint);
//     let weather = await response.json();

//     return weather;
// }


// search.addEventListener('keydown', (e) => {
// console.log(e.keycode === 13) {
//     let weather = getWeatherByCity(search.value);