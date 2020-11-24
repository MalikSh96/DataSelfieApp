// Geo Locate
let lat;
let lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    //let weather;
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);

    const api_key = 'd66df24d7440d3bd4123c80a3edc63f9';
    const api_url = `/weather/lat=${lat}&lon=${lon}&appid=${api_key}`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);

    //weather = json.weather.currently;
    //air = json.air_quality.results[0].measurements[0];
    //document.getElementById('summary').textContent = weather.summary;
    //document.getElementById('temp').textContent = weather.temperature;*/

    /*const data = { 
      lat, 
      lon, 
      weather 
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
    console.log(db_json);*/
  });
} else {
  console.log('geolocation not available');
}

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