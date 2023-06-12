// packages used for this application
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const https = require("https");
const port = 7000;

// creates the route for URL to index.html
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// here we will implement our API call to our URL
app.post("/", function (req, res) {
  const city = req.body.city;
  const apiKey = "d5b3c30e5e9ff51c3ad7a608c01d2a3e&units=imperial";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const jsonData = JSON.parse(data);
      const temp = jsonData.main.temp;
      const desc = jsonData.weather[0].description;
      const icon = jsonData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1>The temperature in ${city} is ${temp} degrees.</h1>`);
      res.write(`<h1>The weather description is ${desc}. </h1>`);
      res.write("<img src = " + imgUrl + ">");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});
