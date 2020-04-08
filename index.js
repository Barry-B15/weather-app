const express = require('express'); //1.0
const Datastore = require('nedb');
const fetch = require('node-fetch');


const app = express();
const port = 3000;
app.listen(port, () => console.log(`Listening at localhost: ${port}`));

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase(); //7.3

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

// get the weather using route parameters :latlon
app.get('/weather/:latlon', async(request, response) => {
    console.log('request: ', request.params);

    try {
        // split the request result along the comma and store as latlon
        const latlon = request.params.latlon.split('&');
        const lat = latlon[0]; // store 1st index is lat
        const lon = latlon[1]; // store 2nd index as lon
        console.log('lat-lon: ', lat, lon);

        //# add the api key/url : from 1st api - openweathermap
        const weather_url = `1st api key here `; //openweathermap api

        //make a get request to that api url 
        const weather_response = await fetch(weather_url); // make sure the async keyword is added to the func above
        const weather_data = await weather_response.json();
        //response.json(json)
        //console.log(data);

        //weather2: get the airquality from the 2nd api - openairQuality api
        const aq_url = `2nd api key here`;

        //# make a get request to that api url
        const aq_response = await fetch(aq_url); // make sure the async keyword is added to the func above
        const aq_data = await aq_response.json();

        //data now 
        const data = {
            weather: weather_data,
            aq_data: aq_data
        };
        //response.json(json)
        //console.log(json);
        response.json(data);
        console.log(data);
        // go change the way we get weather in weather.js and add for air quality in weather.js
        //next();

    } catch (error) {
        //next(error);
        console.error(error);
    }
});