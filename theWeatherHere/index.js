const { request } = require('express');
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

//:latlon in our url is route parameters (latitude and longitude)
app.get('http://api.openweathermap.org/data/2.5/weather?:latlon', async (request, response) => {
  console.log(request.params);
  //Inside our request object is a property called params
  //Inside the params object are all of the parameters, in our case just one parameter, something called latlon
  const latlon = request.params.latlon.split(',');
  console.log(latlon);
  const lat = latlon[0]; //latitude is index 0
  const lon = latlon[1]; //longitude is index 1
  /*
  In theory, as long as we send in, as the route parameter the latitude and longitude 
  separated by a comma, we can pull it out of request.params, split it by comma into an array and 
  put them in each of our variables above.
  */
  console.log(lat, lon);
  const api_key = 'My API key'; //My api key
  const api_url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  const weather_response = await fetch(api_url);
  const weather_data = await weather_response.json();

  const data = {
    weather: weather_data
  }

  response.json(data);
  /*
  We are making the API call from within here
  and then sending it back, this is what is known
  as a proxy server, bascially the server is a proxy for
  open weather map
  */
});