function setup() {
  //p5 adds a canvas by default, but we don't need one
  noCanvas();
  //below captures from the default video source of the computer, the webcam 
  const video = createCapture(VIDEO);
  //size of our camera box, adjusting video size
  video.size(160, 120);
  let lat; 
  let lon;
  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    const mood = document.getElementById('mood').value;
    //The video's canvas element is not present by default, we need to alert p5 to the fact that we want to use a canvas
    video.loadPixels();
    //Below code v won't work without above code ^ (image64 and video.loadPixels();)
    //Takes the video's canvas, converts it to base64 and puts it in the variable image64
    const image64 = video.canvas.toDataURL();
    
    //javascript object
    const data = {
      lat,
      lon,
      mood,
      image64
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
  });

  if ('geolocation' in navigator) {
    console.log('geolocation available');
    //We geolocate using the below function which takes in a callback function
    //OBS, see readme.md for more info
    //position is the param we pass into the arrow function
    /*navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, ' and ', position.coords.longitude);
    });*/
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
    });
  } else {
    //Geolocation is NOT available
    console.log('geolocation not available');
  }
}