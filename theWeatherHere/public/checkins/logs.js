const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    //Accessing the database fields for each stored entry
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    let txt = `The weather here at ${item.lat}&deg;,
    ${item.lon}&deg; is ${item.w_description[0].main} with
    a temperature of ${item.w_temp.temp}&deg;C.`;

    if (item.air_quality.value < 0) {
      txt += '  No air quality reading.';
    } else {
      txt += `  The concentration of particulate matter 
      is ${item.air_quality.data[0].pm25} µg/m³ with a predominant 
    pollen type of ${item.air_quality.data[0].predominant_pollen_type}`;
    }

    marker.bindPopup(txt); //a function that is part of Leaflet.js where you can bind some text to a popup anytime you hover/click on a marker
  }
  console.log(data);
}