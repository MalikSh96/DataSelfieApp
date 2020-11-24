getData();
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  //for each element in our data array
  for (item of data) {
    //we are creating html dom elements
    const root = document.createElement('p');
    const mood = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');

    mood.textContent = `mood: ${item.mood}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    geo.textContent = `latitude: ${item.latitude}°, longitude: ${item.longitude}°`;
    date.textContent = dateString;
    image.src = item.image; //puts the base64 encoded data itself by using the .src attribute
    image.alt = "Malik taking selfies"; //this is used for when using Web Accessibility Evaluation tool
    //console.log("What is the image? " + image);
    //break;
    if (image.src == 0) {
      console.log('NO IMAGE PROVIDED');
      root.append(mood, geo, date);
      //Finally, append the element to the HTML body
      document.body.append(root);
    }
    console.log('IMAGE PROVIDED');
    root.append(mood, geo, date, image);
    //Finally, append the element to the HTML body
    document.body.append(root);
  }
  console.log(data);
}