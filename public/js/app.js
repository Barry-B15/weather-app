//8. re-arrange
//8.1 def the lat lon
let lat, lon;

//def the btn and add click listener
const button = document.getElementById('submit');
button.addEventListener('click', async event => {
    const car = document.getElementById('cars').value;

    //8.2 move this data here from the geolocation
    const data = {
        lat,
        lon,
        car // add the new element
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('api', options); //8.3 use 'api' instead of '/api' otherwise the lat lon wont be saved to db. Lost time tracing this.
    const json = await response.json();
    console.log(json);
});


//take data (geolocation) from client
if ('geolocation' in navigator) {
    console.log('geolocation available');

    //get current position
    navigator.geolocation.getCurrentPosition(async position => {
        //def lat lon and get the coords
        /* 8.4 remove the const, use lat lon we already defined globally
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
         */
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;
        console.log(position); //console log the pos
    });
} else {
    console.log('geolocation not available'); // if geolocation is not available
}