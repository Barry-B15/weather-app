//Geo locate
let lat, lon;
//take data (geolocation) from client
if ('geolocation' in navigator) {
    console.log('geolocation available');

    //get current position
    navigator.geolocation.getCurrentPosition(async position => {
        let lat, lon, weather, air; // def the variables
        try {
            //def lat lon and get the coords
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat.toFixed(2);
            document.getElementById('longitude').textContent = lon.toFixed(2);

            //def the api key/url (and fully in the server index.js)
            const api_url = `weather/${lat}&${lon} `;
            //make a get request to that api url
            const response = await fetch(api_url); // make sure the async keyword is added to the func above
            const json = await response.json();
            console.log(json);

            //weather2:New location data // city, country, temp and weather from openWeather api 
            weather = json.weather;
            air = json.aq_data.results[0].measurements[0];
            // must look at the node of devtool console / air_quality from video didnt work, devtool helped (weather or aq_data worked)
            document.getElementById('summary').textContent = weather.weather[0].description;
            document.getElementById('temperature').textContent = weather.main.temp;
            document.getElementById('city').textContent = weather.name;
            document.getElementById('country').textContent = weather.sys.country;

            // add the air quality from openAir Quality api: https://openaq.org/#/why?_k=m2iyhg
            document.getElementById('aq_parameter').textContent = air.parameter;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.unit;
            document.getElementById('aq_date').textContent = air.lastUpdated;

        } catch (error) {
            //console.error(error);
            air = { value: -1 }; // if there's no value for air // go to log and put the text to display
            console.log('Something went wrong: Needs Fixing');
            //or 
            //document.getElementById('aq_value').textContent = 'No READING';
        }

        //move the save to db here so that no matter what, air will always be stored in db
        // then hard code -1 in the error section
        //Uncomment later 04/14
        const data = {
            lat,
            lon,
            weather,
            air
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(data)
        };
        const db_response = await fetch('api', options);
        const db_json = await db_response.json();
        console.log(db_json);

    });
} else {
    console.log('geolocation not available'); // if geolocation is not available
}