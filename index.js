const express = require('express'); //1.0
const Datastore = require('nedb');
const fetch = require('node-fetch');

require('dotenv').config(); //1. to hide api_key; (after installing dotenv) require env 

//console.log(process.env); //1.2// log and see that it is added


const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Starting server at: ${port}`));

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
        // split the request result along the & and store as latlon
        const latlon = request.params.latlon.split('&');
        console.log(latlon);
        const lat = latlon[0]; // store 1st index is lat
        const lon = latlon[1]; // store 2nd index as lon
        console.log('lat-lon: ', lat, lon);

        //define api_key
        const api_key = process.env.API_KEY; //3. move the key into .env file and call it here
        //const api_key = 'xxxxxx'; // above should replace this but its not working

        //# add the api key/url : from 1st api - openweathermap                                     use the api_key here
        const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`; //openweathermap api



        //make a get request to that api url 
        const weather_response = await fetch(weather_url); // make sure the async keyword is added to the func above
        const weather_data = await weather_response.json();
        //response.json(json)
        //console.log(data);

        //weather2: get the airquality from the 2nd api - openairQuality api
        const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat}&lon=${lon}`;
        //# make a get request to that api url
        const aq_response = await fetch(aq_url); // make sure the async keyword is added to the func above
        const aq_data = await aq_response.json();


        //data now 
        const data = {
            weather: weather_data,
            aq_data: aq_data //aq_data on the left is air_quality as used on the api devtool
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