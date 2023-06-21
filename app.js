const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
    console.log(" file sent ");

});

app.post("/" , function(req , res){
    const query =  req.body.cityname;

    const url= "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=dd667f0f9176802fc7bd4771f49f8cad" ;
https.get( url,  function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherNow = JSON.parse(data);
        const temp =  weatherNow.main.temp - 273.15 ;
        const description =weatherNow.weather[0].description;

        const city = weatherNow.name;
        
        console.log(temp);
        console.log(description);
        res.write(" The weather is currently " + description);
        res.write(" The temp in " + query + " is currently " + temp + " degree celcius");
        res.send()
    });

});
});

app.listen(process.env.PORT || 3000, function(){
    console.log(" server has started on port 3000");
});

