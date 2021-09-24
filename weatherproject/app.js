const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { json } = require('body-parser');


const app = express()
app.use(express.urlencoded({extended:true}))




// routes
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html")
})


app.post("/",(req,res) => {
    console.log("Post Request Recived on home directory");
    var cityName = req.body.cityName;
    var apiKey = "7a061c00bc49db9756b5da9de35229e7";
    var unit = "metric";
    var WeatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName+"&appid="+ apiKey +"&units=" + unit;
    https.get(WeatherURL,function(response) {
        response.on("data",(data)=>{
            var weatherData = JSON.parse(data)
            var icon  = weatherData.weather[0].icon;
            var imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h4>Weather Description: " +weatherData.weather[0].description + "</h4>");
            res.write("<h1>The temprature in " +cityName+" is "+ weatherData.main.temp + "degree celcius.</h1>");
            res.write('<img src = "' + imageURL+ '">')
        })
    })
})

app.listen(3000, ()=>{
    console.log("Server running at server 3000")
})