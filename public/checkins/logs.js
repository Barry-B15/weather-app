//4. (cont frm index.html) create the map object
const mymap = L.map('checkinMap').setView([0, 0], 1); /// put the map on the page

// //5. I need to investigate this from module 1, I didn't do that module
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//6. def the tiles
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {

        //7. add a marker at the latlon (ref Leaflet page)
        //const marker = L.marker([50.5, 30.5]).addTo(mymap); //works
        const marker = L.marker([item.lat, item.lon]).addTo(mymap); //doesn't work why?

        let txt = `The weather here at ${item.lat}&deg;,
                 ${item.lon}&deg; is ${item.weather.description} with
                 a temperature of ${item.weather.temp}&deg; C.`;

        //display weather with text on page
        if (item.air.value < 0) {
            txt += '  No air quality reading available'
        } else {
            txt += `  The concentration of particulate matter 
                 (${item.air.parameter}) is ${item.air.value} 
                 ${item.air.unit} last read on ${item.air.lastUpdated}`;
        }

        //8. bind the text to the marker popup on page
        marker.bindPopup(txt);
        //console.log(data);
    }
    console.log(data);
}