// Geo Locate
let lat;
let lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat;
    let lon;
    let weather;
    //console.log(weather);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);

    const api_key = 'My API Key';
    const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await fetch(api_url);
    const json = await response.json();
    const weatherDescription = json.weather;
    const weatherTemperature = json.main;
    document.getElementById('summary').textContent = weatherDescription[0].description;
    document.getElementById('temp').textContent = weatherTemperature.temp;
    //console.log(json);

    const data = {
      lat,
      lon,
      weatherDescription,
      weatherTemperature
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