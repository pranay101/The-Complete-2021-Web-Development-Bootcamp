const express = require('express');
const https = require('https');
const app = express()

// routes
app.get("/",(req,res) => {
    console.log("client requested index") 
    var WeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=paris&appid=7a061c00bc49db9756b5da9de35229e7&units=metric"
    https.get(WeatherURL,function(response) {
        console.log(response);
    })
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000, ()=>{
    console.log("Server running at server 3000")
})