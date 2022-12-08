let weatherAPIKey = '0241c01f3784a713363c767ae4ed4108';
let weatherBase =''

let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndPoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
}