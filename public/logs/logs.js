// publishing the images to the page!
// moved part of the code from app.js
getData();

//=============== Sort Images =========================
const selfies = [];

document.getElementById('time').addEventListener('click', event => {
    sortData((a, b) => b.time - a.time);
});
document.getElementById('status').addEventListener('click', event => {
    sortData((a, b) => {
        if (b.status > a.status) return -1;
        else return 1;
    });
});

function sortData(compare) {
    for (let item of selfies) {
        item.elt.remove();
    }
    selfies.sort(compare);
    for (let item of selfies) {
        document.body.append(item.elt);
    }
}
//=============== Sort Images End===================




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