// publishing the images to the page!
// moved part of the code from app.js
getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('p');
        //const mood = document.createElement('div');
        const status = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        //create the image node on the DOM
        const image = document.createElement('img');


        //mood.textContent = `Mood: ${item.mood}`;
        status.textContent = `Status: ${item.status}`;
        geo.textContent = `Lat: ${item.lat}\xB0, Lon: ${item.lon}\xB0`; // \xB0 for '°' degree symbol

        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.img64; // add the image source
        image.alt = "making faces on the cam"; // alt atrribute to the image

        root.append(
            //mood,
            status,
            geo,
            date,
            image); //append the image to root

        document.body.append(root);

    }
    console.log(data); // then call this func above it
}