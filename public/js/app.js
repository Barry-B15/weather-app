//take data (geolocation) from client
if ('geolocation' in navigator) {
    console.log('geolocation available');

    //get current position
    navigator.geolocation.getCurrentPosition(position => {
        //def lat lon and get the coords
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;
        console.log(position); //console log the pos

    });
} else {
    console.log('geolocation not available'); // if geolocation is not available
}