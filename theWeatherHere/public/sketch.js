// Geo Locate
let lat;
let lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    try {
      let lat;
      let lon;
      let weather;
      //console.log(weather);
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);

      const api_key = 'My API Key';
      const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      const response = await fetch(weather_url);
      const weather_data = await response.json();
      const weatherDescription = weather_data.weather;
      const weatherTemperature = weather_data.main;
      document.getElementById('summary').textContent = weatherDescription[0].description;
      document.getElementById('temp').textContent = weatherTemperature.temp;
      //console.log(weather_data);

      //aq = air quality
      const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
      const aq_response = await fetch(aq_url);
      const aq_data = await aq_response.json();
      const air = aq_data.results[0].measurements[0]; //this can return empty which in return gives an undefined result
      document.getElementById('aq_parameter').textContent = air.parameter;
      document.getElementById('aq_value').textContent = air.value;
      document.getElementById('aq_units').textContent = air.unit;
      document.getElementById('aq_date').textContent = air.lastUpdated;

      const data = {
        w_description: weatherDescription,
        w_temp: weatherTemperature,
        air_quality: aq_data
      };
      /*const data = {
        lat,
        lon,
        weatherDescription,
        weatherTemperature
      };*/
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const db_response = await fetch('/api', options);
      const db_json = await db_response.json();
      console.log(db_json);
    }
    catch(error) {
      console.error(error);
      air = { 
        value: -1 
      };
      document.getElementById('aq_value').textContent = 'NOT READING';
      //console.log('Something went wrong');
    }
  });
} else {
  console.log('geolocation not available');
}

//Below simply displays (gets) position
const button = document.getElementById('checkin');
button.addEventListener('click', async event => {
  const data = {
    lat,
    lon
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const db_response = await fetch('/api', options);
  const db_json = await db_response.json();
  console.log(db_json);
})