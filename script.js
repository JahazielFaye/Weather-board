// initialize variables
var city="";

var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");  // Get the element for displaying the current temperature
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var cities=[];  // Initialize an array to store searched cities

// function to check if the city is already in the list of searched cities
function find(c){
    for (var i=0; i<cities.length; i++){
        if(c.toUpperCase()===cities[i]){
            return -1;
        }
    }
    return 1;
}

// API key for OpenWeatherMap API
var APIKey= "0241c01f3784a713363c767ae4ed4108";

// function to display current weather for a given city
function displayWeather(event){
    event.preventDefault();  // Prevent the form from submitting and reloading the page
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();  // Get the value of the search input field and trim any leading or trailing whitespace
        currentWeather(city);
    }
}

// function to get current weather data from OpenWeatherMap API
function currentWeather(city){

    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;  // set the API URL for getting the current weather data for the city
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){   // Use a promise to handle the response from the API

        console.log(response);

        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";

        var date=new Date(response.dt*1000).toLocaleDateString();

        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");  // Set the content of the element for displaying the current city to include the city name, date, and weather icon image


        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"&#8457");

        $(currentHumidty).html(response.main.humidity+"%");

        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsmph+"MPH");

//Saves Searched Cities
        forecast(response.id);
        if(response.cod==200){    
            cities=JSON.parse(localStorage.getItem("cityname"));
            console.log(cities);
            if (cities==null){
                cities=[];
                cities.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(cities));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    cities.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(cities));
                    addToList(city);
                }
            }
        }

    });
}
    
function forecast(cityid){
    var dayover= false;
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        
        for (i=0;i<5;i++){
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var tempK= response.list[((i+1)*8)-1].main.temp;
            var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#fDate"+i).html(date);
            $("#fImg"+i).html("<img src="+iconurl+">");
            $("#fTemp"+i).html(tempF+"&#8457");
            $("#fHumidity"+i).html(humidity+"%");
        }
        
    });
}

function addToList(c){
    var listEl= $("<li>"+c.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);

}
function invokePastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        currentWeather(city);
    }

}

function loadlastCity(){
    $("ul").empty();
    var cities = JSON.parse(localStorage.getItem("cityname"));
    if(cities!==null){
        cities=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<cities.length;i++){
            addToList(cities[i]);
        }
        city=cities[i-1];
        currentWeather(city);
    }

}
//Clear History button
function clearHistory(event){
    event.preventDefault();
    cities=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}

$("#search-button").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
$("#clear-history").on("click",clearHistory);





