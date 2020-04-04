//11 p5.js uses a set up func, create one and move all code inside it
function setup() {
    noCanvas(); //11.2 we do not need a canvas for this project
    const video = createCapture(VIDEO); //11.3 we need videocam instead
    video.size(300, 240); // resize the video

    //8.1 def the lat lon
    let lat, lon;

    //def the btn and add click listener
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const status = document.getElementById('status').value;

        //11.4 def a const to hold the image
        video.loadPixels(); //1st tell video to load pixels
        const img64 = video.canvas.toDataURL();

        const data = {
            lat,
            lon,
            status,
            img64 // 11.5 add the new image to data set
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('api', options);
        const json = await response.json();
        console.log(json);
    });

    //take data (geolocation) from client
    if ('geolocation' in navigator) {
        console.log('geolocation available');

        //get current position
        navigator.geolocation.getCurrentPosition(async position => {
            //def lat lon and get the coords

            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            console.log(position); //console log the pos
        });
    } else {
        console.log('geolocation not available'); // if geolocation is not available
    }
    //11.1 test to see a canvas created by adding p5.js
    //background(255, 0, 0); // we will not use it, so remove
}