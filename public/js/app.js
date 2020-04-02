//take data (geolocation) from client
if ('geolocation' in navigator) {
    console.log('geolocation available');

    //get current position
    navigator.geolocation.getCurrentPosition(async position => { //6.0 make this an async func
        //def lat lon and get the coords
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;
        console.log(position); //console log the pos

        //5.1 (see server side) fetch/send user data in json format
        const data = {
            lat,
            lon
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        //6.1 Make fetch await()
        /* fetch('/api', options).then(response => {
            console.log(response);
        }); */
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
    });
} else {
    console.log('geolocation not available'); // if geolocation is not available
}